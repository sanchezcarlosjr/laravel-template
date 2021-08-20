<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>SIIIP UABC - Coordinación General de Investigación y Posgrado (CGIP)</title>
    <meta name="description"
          content="Sistema Institucional de Indicadores de Investigación y Posgrado (SIIIP) de la Universidad Autónoma de Baja California (UABC), desarrollado por la Coordinación General de Investigación y Posgrado (CGIP) -cimarrones-. Puedes encontrar sus indicadores PRODEP, cuerpos académicos, redes, investigadores SNI y sus proyectos de investigación.">
    <meta content='width=device-width, initial-scale=1.0, shrink-to-fit=no' name='viewport'/>
    <link rel="icon" href="{{asset('img/logo.png')}}" type="image/x-icon"/>
    <!--
       Glad to meet you!
       © 2021 Universidad Autónoma de Baja California
       © 2021 sanchezcarlosjr.com <hello@sanchezcarlosjr.com> (UABC Alumni)
    -->
    <meta property="og:locale" content="es_MX">
    <meta property="og:type" content="website">
    <meta property="og:title" content="SIIIP UABC - Coordinación General de Investigación y Posgrado (CGIP)">
    <meta property="og:description"
          content="Sistema Institucional de Indicadores de Investigación y Posgrado (SIIIP) de la Universidad Autónoma de Baja California (UABC), desarrollado por la Coordinación General de Investigación y Posgrado (CGIP) -cimarrones-. Puedes encontrar sus indicadores PRODEP, cuerpos académicos, redes, investigadores SNI y sus proyectos de investigación.">
    <meta property="og:url" content="https://siiip.ens.uabc.mx/">
    <meta property="og:site_name" content="SIIIP">
    <meta property="og:image" content="{{asset('img/banner.png')}}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <link rel="stylesheet" href="{{asset('css/bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{asset('css/atlantis.css')}}">
    <link rel="stylesheet" href="{{asset('css/demo.css')}}">

    <link href="{{asset('css/app.css')}}" rel="stylesheet">
    <link href="{{asset('css/font-awesome.css')}}" rel="stylesheet">

    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
<div id="app" class="content">
    <entry-component>
        Cargando...
    </entry-component>
</div>
<script src="{{asset('js/app.js')}}"></script>
<script src="{{asset('js/font-awesome.js')}}"></script>
</body>
</html>
