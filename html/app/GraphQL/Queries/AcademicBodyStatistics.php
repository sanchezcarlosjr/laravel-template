<?php
namespace App\GraphQL\Queries;

use App\Models\AcademicBody;
use App\Models\Employee;

class AcademicBodyStatistics {
  public function __invoke($_, $args) {
    /** Get all */
    $academicBodiesQuery = AcademicBody::getModel();

    /** Manually apply scopes, order doesn't matter */
    if (isset($args["grade"])) {
      $academicBodiesQuery = $academicBodiesQuery->grade($args["grade"]);
    }
    if (isset($args["campus"])) {
      $academicBodiesQuery = $academicBodiesQuery->campus($args["campus"]);
    }
    if (isset($args["validity"])) {
      $academicBodiesQuery = $academicBodiesQuery->validity($args["validity"]);
    }
    if (isset($args["terms"])) {
      $academicBodiesQuery = $academicBodiesQuery->terms($args["terms"]);
    }

    /** Laravel Collection */
    $academicBodies = $academicBodiesQuery->get();

    /** Count Filtered AB */
    $academicBodiesTotal = $academicBodies->count();
    /** Count by grade */
    $grades = $academicBodies->countBy(function($academicBody) {
        return $academicBody->grade;
    });

    /** Members Collection in filtered AB */
    $members = Employee::members()->get()->whereIn("academicBody.id", $academicBodies->pluck("id"));

    /** Active/Inactive SNI or PRODEP */
    $activeSNIorPRODEP = $members->countBy(function($member) {
      return ($member->has_active_sni || $member->has_active_prodep_profile)?"active":"inactive";
    });
    /** Count Filtered Members in AB*/
    $inAcademicBody = $members->count();
    /** Count free Employees */
    $freeEmployees = Employee::free(true)->count();

    return array(
      'total' => $academicBodiesTotal,
      'professorsWithSNIOrProdep' => $activeSNIorPRODEP["active"]??0,
      'professorsInAcademicBody' => $inAcademicBody,
      'ptcsAreNotAcademicBody' => $freeEmployees,
      "inTraining" => $grades["En formación"]??0,
      "inConsolidation" => $grades["En consolidación"]??0,
      "consolidated" => $grades["Consolidado"]??0
    );
  }
}
