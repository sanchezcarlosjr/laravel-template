<?php

namespace App\GraphQL\Mutations;

use App\Models\AcademicBody;
use App\Models\Employee;
use App\Models\LGAC;
use App\Models\Member as MemberModel;
use Error;

class Member {
  private function getLGACs($lgac_ids) {
    $lgacs = LGAC::whereIn("id", $lgac_ids)->get();
    if ($lgacs->isEmpty()) {
      throw new Error('LGAC inválidas', '402');
    }
    return $lgacs;
  }

  private function getEmployee($employee_id) {
    $employee = Employee::find($employee_id);
    if (is_null($employee)) {
      throw new Error('Empleado inválido', '402');
    }
    return $employee;
  }

  private function matchAcademicBody($lgacs, $academic_body_id) {
    if(!$lgacs->every(function($value, $key) use ($academic_body_id) {
      return $value->cuerpo_academico_id == $academic_body_id;
    })) {
      throw new Error('El empleado solo puede pertenecer a un cuerpo académico.', '402');
    }
  }

  private function setAsLeader($employee, $isLeader) {
    if ($isLeader) {
      $academic_body = $employee->academic_body;
      $academic_body->leader()->associate($employee);
      $academic_body->save();
    }
  }

  private function detach($employee_id, $lgacs) {
    $memberships = MemberModel::where("nempleado", $employee_id)
      ->whereNull("deleted_at")
      ->whereNotIn("lgac_cuerpos_academicos_id", $lgacs->modelKeys())
      ->get();
    foreach ($memberships as $member) {
      $member->delete();
    }
  }

  private function attach($employee_id, $lgacs) {
    foreach ($lgacs as $lgac) {
      MemberModel::firstOrCreate([
        "nempleado" => $employee_id,
        "lgac_cuerpos_academicos_id" => $lgac->id
      ]);
    }
  }

  private function sync($employee_id, $lgacs) {
    $this->detach($employee_id, $lgacs);
    $this->attach($employee_id, $lgacs);
  }

  private function _upsert(array $args) {
    /** Retrieve LGACs */
    $lgacs = $this->getLGACs($args["lgac_ids"]);
    /** Retrieve Employee */
    $employee = $this->getEmployee($args["employee_id"]);
    /** Create (true) or Update (false) */
    $upsert = $args["optype"]??$employee->academic_bodies_lgacs->isEmpty();

    if ($upsert) {
      /** Create */
      /** Get Academic Body Id from first Candidate LGAC */
      $academic_body_id = $lgacs[0]->academic_body->id;
    } else {
      /** Update */
      /** Get Academic Body Id of Candidate Employee */
      $academic_body_id = $employee->academic_body->id;
    }

    /** Check if they match Academic Body Id */
    $this->matchAcademicBody($lgacs, $academic_body_id);
    /** If no Error is thrown, continue */

    $memberships = MemberModel::where("nempleado", $args["employee_id"])
      ->whereNull("deleted_at")
      ->whereNotIn("lgac_cuerpos_academicos_id", $lgacs->modelKeys())->get();

    /** Apparently pivot tables are not designed for soft delete :( )*/
    if ($upsert) {
      /** Create in Pivot Table */
      //$employee->academic_bodies_lgacs()->attach($lgacs->modelKeys());
      $this->attach($args["employee_id"], $lgacs);
    } else {
      /** Sync in Pivot Table */
      //$employee->academic_bodies_lgacs()->sync($lgacs->modelKeys());
      $this->sync($args["employee_id"], $lgacs);
    }

    /** Refresh */
    $employee->refresh();

    /** Set as Leader if true */
    $this->setAsLeader($employee, $args["is_leader"]??false);

    return $employee;
  }

  public function upsert($root, array $args) {
    return $this->_upsert($args);
  }

  public function create($root, array $args) {
    /** Force Create */
    $args["optype"] = true;
    return $this->_upsert($args);
  }

  public function update($root, array $args) {
    /** Force Update */
    $args["optype"] = false;
    return $this->_upsert($args);
  }
}
