--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4 (Ubuntu 12.4-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.4 (Ubuntu 12.4-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alumnos; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.alumnos (
    matricula character varying(20) NOT NULL,
    nposgrado integer NOT NULL,
    nunidad integer NOT NULL,
    evaluo character varying(2) NOT NULL,
    periodo character varying(10) NOT NULL,
    comentarios text
);


ALTER TABLE public.alumnos OWNER TO desarrollo1;

--
-- Name: anexos; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.anexos (
    nanexo integer NOT NULL,
    anexo character varying(150) NOT NULL,
    tipo character varying,
    clave character varying(15) NOT NULL
);


ALTER TABLE public.anexos OWNER TO desarrollo1;

--
-- Name: anexos_nanexo_seq; Type: SEQUENCE; Schema: public; Owner: desarrollo1
--

CREATE SEQUENCE public.anexos_nanexo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.anexos_nanexo_seq OWNER TO desarrollo1;

--
-- Name: anexos_nanexo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desarrollo1
--

ALTER SEQUENCE public.anexos_nanexo_seq OWNED BY public.anexos.nanexo;


--
-- Name: areas; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.areas (
    id_area integer NOT NULL,
    area character varying(50) NOT NULL
);


ALTER TABLE public.areas OWNER TO desarrollo1;

--
-- Name: areas_con; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.areas_con (
    narea integer NOT NULL,
    area character varying(40) NOT NULL
);


ALTER TABLE public.areas_con OWNER TO desarrollo1;

--
-- Name: areas_id_area_seq; Type: SEQUENCE; Schema: public; Owner: desarrollo1
--

CREATE SEQUENCE public.areas_id_area_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.areas_id_area_seq OWNER TO desarrollo1;

--
-- Name: areas_id_area_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desarrollo1
--

ALTER SEQUENCE public.areas_id_area_seq OWNED BY public.areas.id_area;


--
-- Name: autorizacion; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.autorizacion (
    id_com integer NOT NULL,
    clave character varying(15),
    tipo integer,
    comentario text,
    enviado integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.autorizacion OWNER TO desarrollo1;

--
-- Name: autorizacion_id_com_seq; Type: SEQUENCE; Schema: public; Owner: desarrollo1
--

CREATE SEQUENCE public.autorizacion_id_com_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.autorizacion_id_com_seq OWNER TO desarrollo1;

--
-- Name: autorizacion_id_com_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desarrollo1
--

ALTER SEQUENCE public.autorizacion_id_com_seq OWNED BY public.autorizacion.id_com;


--
-- Name: bajas; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.bajas (
    nempleado integer NOT NULL,
    estatus character(1)
);


ALTER TABLE public.bajas OWNER TO desarrollo1;

--
-- Name: becarios; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.becarios (
    cbecario integer NOT NULL,
    clave character varying(15),
    apaterno character varying(25),
    amaterno character varying(25),
    nombre character varying(25),
    sexo character varying(1),
    nunidad integer,
    tipo character varying(60),
    grado character varying(15),
    pe integer,
    monto double precision
);


ALTER TABLE public.becarios OWNER TO desarrollo1;

--
-- Name: becarios_cbecario_seq; Type: SEQUENCE; Schema: public; Owner: desarrollo1
--

CREATE SEQUENCE public.becarios_cbecario_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.becarios_cbecario_seq OWNER TO desarrollo1;

--
-- Name: becarios_cbecario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desarrollo1
--

ALTER SEQUENCE public.becarios_cbecario_seq OWNED BY public.becarios.cbecario;


--
-- Name: calificaciones; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.calificaciones (
    ma_mat integer NOT NULL,
    indicador integer NOT NULL,
    calificacion double precision NOT NULL,
    matricula character varying(20)
);


ALTER TABLE public.calificaciones OWNER TO desarrollo1;

--
-- Name: cat_productos; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.cat_productos (
    cproducto character varying(5) NOT NULL,
    producto character varying(80),
    consecutivo integer NOT NULL
);


ALTER TABLE public.cat_productos OWNER TO desarrollo1;

--
-- Name: cat_productos_consecutivo_seq; Type: SEQUENCE; Schema: public; Owner: desarrollo1
--

CREATE SEQUENCE public.cat_productos_consecutivo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cat_productos_consecutivo_seq OWNER TO desarrollo1;

--
-- Name: cat_productos_consecutivo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desarrollo1
--

ALTER SEQUENCE public.cat_productos_consecutivo_seq OWNED BY public.cat_productos.consecutivo;


--
-- Name: categorias; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.categorias (
    c_categoria integer NOT NULL,
    categoria character varying(100) NOT NULL,
    tipo character varying(20),
    clase character varying(20)
);


ALTER TABLE public.categorias OWNER TO desarrollo1;

--
-- Name: cronograma; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.cronograma (
    clave character varying(15),
    cons integer NOT NULL,
    actividad character varying(255),
    tiempo character varying(23)
);


ALTER TABLE public.cronograma OWNER TO desarrollo1;

--
-- Name: cronograma_cons_seq; Type: SEQUENCE; Schema: public; Owner: desarrollo1
--

CREATE SEQUENCE public.cronograma_cons_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cronograma_cons_seq OWNER TO desarrollo1;

--
-- Name: cronograma_cons_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desarrollo1
--

ALTER SEQUENCE public.cronograma_cons_seq OWNED BY public.cronograma.cons;


--
-- Name: cuerpo; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.cuerpo (
    ccuerpo integer NOT NULL,
    cuerpo character varying(255) NOT NULL,
    grado character varying(30),
    lider integer
);


ALTER TABLE public.cuerpo OWNER TO desarrollo1;

--
-- Name: cuerpos; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.cuerpos (
    ccuerpo integer NOT NULL,
    cuerpo character varying(200) NOT NULL,
    grado character varying(30),
    disciplina character varying(80),
    areapromep character varying(80),
    des integer,
    clave_promep character varying(20),
    a_registro integer,
    prox_revision character varying(20),
    narea integer,
    estatus character(1),
    vigencia character varying(30)
);


ALTER TABLE public.cuerpos OWNER TO desarrollo1;

--
-- Name: des; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.des (
    cdes integer NOT NULL,
    des character varying(80) NOT NULL
);


ALTER TABLE public.des OWNER TO desarrollo1;

--
-- Name: docentes; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.docentes (
    nempleado integer,
    apaterno character varying(25),
    amaterno character varying(25),
    nombre character varying(25),
    cmateria character varying(20),
    materia character varying(150),
    periodo character varying(10),
    posgrado character varying(100),
    nunidad integer,
    unidad character varying(80)
);


ALTER TABLE public.docentes OWNER TO desarrollo1;

--
-- Name: emp_uabc; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.emp_uabc (
    nempleado integer NOT NULL,
    nombre character varying(50) NOT NULL,
    apaterno character varying(50),
    amaterno character varying(50),
    domicilio character varying(100),
    telefono character varying(30),
    rfc character varying(30),
    imss character varying(20),
    sexo character varying(20),
    f_nacimiento character varying(15),
    f_ingreso character varying(15),
    curp character varying(30),
    estatus character(1),
    actualizo character varying(10)
);


ALTER TABLE public.emp_uabc OWNER TO desarrollo1;

--
-- Name: empleados; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.empleados (
    nempleado integer NOT NULL,
    nombre character varying(50) NOT NULL,
    apaterno character varying(50),
    amaterno character varying(50),
    grado character varying(15),
    esp character varying(50),
    nunidad integer NOT NULL,
    c_categoria integer,
    domicilio character varying(100),
    telefono character varying(30),
    sexo character varying(10),
    f_nacimiento character varying(15),
    f_ingreso character varying(15),
    correo1 character varying(50),
    correo2 character varying(50),
    password character varying(30),
    estatus character(1),
    actualizo character(1),
    celular character varying(30),
    narea integer
);


ALTER TABLE public.empleados OWNER TO desarrollo1;

--
-- Name: empresas; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.empresas (
    nempresa integer NOT NULL,
    nombre character varying(255) NOT NULL,
    direccion character varying(200),
    giro character varying(200),
    telefono character varying(15),
    representante character varying(200),
    encargado character varying(200),
    correo character varying(100),
    clave character varying(15) NOT NULL
);


ALTER TABLE public.empresas OWNER TO desarrollo1;

--
-- Name: empresas_nempresa_seq; Type: SEQUENCE; Schema: public; Owner: desarrollo1
--

CREATE SEQUENCE public.empresas_nempresa_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.empresas_nempresa_seq OWNER TO desarrollo1;

--
-- Name: empresas_nempresa_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desarrollo1
--

ALTER SEQUENCE public.empresas_nempresa_seq OWNED BY public.empresas.nempresa;


--
-- Name: emptmp; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.emptmp (
    nempleado integer,
    nombre character varying(50),
    apaterno character varying(50),
    amaterno character varying(50),
    grado character varying(15),
    esp character varying(50),
    nunidad integer,
    c_categoria integer,
    domicilio character varying(100),
    telefono character varying(30),
    sexo character varying(10),
    f_nacimiento character varying(15),
    f_ingreso character varying(15),
    correo1 character varying(50),
    correo2 character varying(50),
    password character varying(30),
    estatus character(1),
    actualizo character(1),
    celular character varying(30),
    narea integer
);


ALTER TABLE public.emptmp OWNER TO desarrollo1;

--
-- Name: estatus; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.estatus (
    cestatus integer NOT NULL,
    estatus character varying(30) NOT NULL
);


ALTER TABLE public.estatus OWNER TO desarrollo1;

--
-- Name: estatus_cestatus_seq; Type: SEQUENCE; Schema: public; Owner: desarrollo1
--

CREATE SEQUENCE public.estatus_cestatus_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.estatus_cestatus_seq OWNER TO desarrollo1;

--
-- Name: estatus_cestatus_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desarrollo1
--

ALTER SEQUENCE public.estatus_cestatus_seq OWNED BY public.estatus.cestatus;


--
-- Name: estatusseguimiento; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.estatusseguimiento (
    cestatus integer,
    estatus character varying(20)
);


ALTER TABLE public.estatusseguimiento OWNER TO desarrollo1;

--
-- Name: foncon; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.foncon (
    clave character varying(15) NOT NULL,
    cfoncon integer NOT NULL,
    monto double precision,
    tipo character varying(30),
    fuente character varying(50)
);


ALTER TABLE public.foncon OWNER TO desarrollo1;

--
-- Name: fuente; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.fuente (
    cfuente integer NOT NULL,
    fuente character varying(50)
);


ALTER TABLE public.fuente OWNER TO desarrollo1;

--
-- Name: indicadores; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.indicadores (
    inciso character varying(2) NOT NULL,
    indicador character varying(80) NOT NULL,
    peso double precision NOT NULL,
    id_indicador integer NOT NULL
);


ALTER TABLE public.indicadores OWNER TO desarrollo1;

--
-- Name: indicadores_id_indicador_seq; Type: SEQUENCE; Schema: public; Owner: desarrollo1
--

CREATE SEQUENCE public.indicadores_id_indicador_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.indicadores_id_indicador_seq OWNER TO desarrollo1;

--
-- Name: indicadores_id_indicador_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desarrollo1
--

ALTER SEQUENCE public.indicadores_id_indicador_seq OWNED BY public.indicadores.id_indicador;


--
-- Name: informes; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.informes (
    clave character varying(15),
    cinforme integer NOT NULL,
    descripcion character varying(255),
    periodo character varying(10),
    tipo character(1)
);


ALTER TABLE public.informes OWNER TO desarrollo1;

--
-- Name: informes_cinforme_seq; Type: SEQUENCE; Schema: public; Owner: desarrollo1
--

CREATE SEQUENCE public.informes_cinforme_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.informes_cinforme_seq OWNER TO desarrollo1;

--
-- Name: informes_cinforme_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desarrollo1
--

ALTER SEQUENCE public.informes_cinforme_seq OWNED BY public.informes.cinforme;


--
-- Name: int_cuerpos; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.int_cuerpos (
    ccuerpo integer NOT NULL,
    nempleado integer NOT NULL,
    tipo character(1),
    lider character(1)
);


ALTER TABLE public.int_cuerpos OWNER TO desarrollo1;

--
-- Name: int_cuerpos_tmp; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.int_cuerpos_tmp (
    ccuerpo integer,
    nempleado integer,
    tipo character(1),
    lider character(1)
);


ALTER TABLE public.int_cuerpos_tmp OWNER TO desarrollo1;

--
-- Name: integrantes; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.integrantes (
    ccuerpo integer NOT NULL,
    nempleado integer NOT NULL,
    nombre character varying(80) NOT NULL,
    tipo character varying(1)
);


ALTER TABLE public.integrantes OWNER TO desarrollo1;

--
-- Name: lgac; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.lgac (
    ccuerpo integer NOT NULL,
    clgac integer NOT NULL,
    linea character varying(255) NOT NULL,
    clave character varying(15),
    estatus character(1),
    descripcion text
);


ALTER TABLE public.lgac OWNER TO desarrollo1;

--
-- Name: lgac_clgac_seq; Type: SEQUENCE; Schema: public; Owner: desarrollo1
--

CREATE SEQUENCE public.lgac_clgac_seq
    START WITH 326
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lgac_clgac_seq OWNER TO desarrollo1;

--
-- Name: lgac_clgac_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desarrollo1
--

ALTER SEQUENCE public.lgac_clgac_seq OWNED BY public.lgac.clgac;


--
-- Name: lic_uni; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.lic_uni (
    clave integer,
    nunidad integer,
    cl_rh integer
);


ALTER TABLE public.lic_uni OWNER TO desarrollo1;

--
-- Name: licenciaturas; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.licenciaturas (
    clave integer NOT NULL,
    licenciatura character varying(100)
);


ALTER TABLE public.licenciaturas OWNER TO desarrollo1;

--
-- Name: lineas_pos; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.lineas_pos (
    clinea integer NOT NULL,
    linea character varying(100) NOT NULL,
    nposgrado integer NOT NULL
);


ALTER TABLE public.lineas_pos OWNER TO desarrollo1;

--
-- Name: lineas_pos_clinea_seq; Type: SEQUENCE; Schema: public; Owner: desarrollo1
--

CREATE SEQUENCE public.lineas_pos_clinea_seq
    START WITH 293
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lineas_pos_clinea_seq OWNER TO desarrollo1;

--
-- Name: lineas_pos_clinea_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desarrollo1
--

ALTER SEQUENCE public.lineas_pos_clinea_seq OWNED BY public.lineas_pos.clinea;


--
-- Name: lineasposgradotmp; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.lineasposgradotmp (
    clave character varying(50),
    programa character varying(150),
    lineapos character varying(150)
);


ALTER TABLE public.lineasposgradotmp OWNER TO desarrollo1;

--
-- Name: lineastrabajo; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.lineastrabajo (
    clave character varying(50),
    lineatrabajo character varying(150)
);


ALTER TABLE public.lineastrabajo OWNER TO desarrollo1;

--
-- Name: login_alumno; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.login_alumno (
    clave character varying(32),
    nposgrado integer NOT NULL,
    usuario character varying(20)
);


ALTER TABLE public.login_alumno OWNER TO desarrollo1;

--
-- Name: mat_maestro; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.mat_maestro (
    cmateria character varying(20) NOT NULL,
    nempleado integer NOT NULL,
    periodo character varying(10) NOT NULL,
    nunidad integer NOT NULL,
    id_mat_maestro integer NOT NULL
);


ALTER TABLE public.mat_maestro OWNER TO desarrollo1;

--
-- Name: mat_maestro_id_mat_maestro_seq; Type: SEQUENCE; Schema: public; Owner: desarrollo1
--

CREATE SEQUENCE public.mat_maestro_id_mat_maestro_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mat_maestro_id_mat_maestro_seq OWNER TO desarrollo1;

--
-- Name: mat_maestro_id_mat_maestro_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desarrollo1
--

ALTER SEQUENCE public.mat_maestro_id_mat_maestro_seq OWNED BY public.mat_maestro.id_mat_maestro;


--
-- Name: materias; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.materias (
    cmateria character varying(20) NOT NULL,
    materia character varying(150) NOT NULL,
    hc double precision,
    hl double precision,
    ht double precision,
    hpc double precision,
    creditos double precision NOT NULL,
    nposgrado integer NOT NULL,
    plan character varying(15),
    tipo_mat integer
);


ALTER TABLE public.materias OWNER TO desarrollo1;

--
-- Name: metas; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.metas (
    clave character varying(15),
    meta character varying(255),
    cons integer NOT NULL,
    porcentaje double precision,
    comentario character varying(255)
);


ALTER TABLE public.metas OWNER TO desarrollo1;

--
-- Name: metas_cons_seq; Type: SEQUENCE; Schema: public; Owner: desarrollo1
--

CREATE SEQUENCE public.metas_cons_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.metas_cons_seq OWNER TO desarrollo1;

--
-- Name: metas_cons_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desarrollo1
--

ALTER SEQUENCE public.metas_cons_seq OWNED BY public.metas.cons;


--
-- Name: nprogramatico; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.nprogramatico (
    clave character varying(15) NOT NULL,
    np character varying(10)
);


ALTER TABLE public.nprogramatico OWNER TO desarrollo1;

--
-- Name: partext; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.partext (
    clave character varying(15) NOT NULL,
    npartext integer NOT NULL,
    apaterno character varying(25),
    amaterno character varying(25),
    nombre character varying(25),
    inst character varying(80),
    pais character varying(50),
    telefono character varying(20),
    correo character varying(50),
    actividades text
);


ALTER TABLE public.partext OWNER TO desarrollo1;

--
-- Name: partext_npartext_seq; Type: SEQUENCE; Schema: public; Owner: desarrollo1
--

CREATE SEQUENCE public.partext_npartext_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.partext_npartext_seq OWNER TO desarrollo1;

--
-- Name: partext_npartext_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desarrollo1
--

ALTER SEQUENCE public.partext_npartext_seq OWNED BY public.partext.npartext;


--
-- Name: periodo_actual; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.periodo_actual (
    periodo_actual character varying(10)
);


ALTER TABLE public.periodo_actual OWNER TO desarrollo1;

--
-- Name: periodo_anterior; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.periodo_anterior (
    periodo_anterior character varying(10)
);


ALTER TABLE public.periodo_anterior OWNER TO desarrollo1;

--
-- Name: periodo_pos; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.periodo_pos (
    periodo character varying(10),
    tipo_plan character varying(20),
    vigente character(1)
);


ALTER TABLE public.periodo_pos OWNER TO desarrollo1;

--
-- Name: periodo_reg; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.periodo_reg (
    periodo_reg character varying(10) NOT NULL
);


ALTER TABLE public.periodo_reg OWNER TO desarrollo1;

--
-- Name: periodos; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.periodos (
    periodo character varying(10) NOT NULL
);


ALTER TABLE public.periodos OWNER TO desarrollo1;

--
-- Name: periodos_promep; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.periodos_promep (
    id_periodo integer NOT NULL,
    inicio date,
    termino date,
    promep character varying(15),
    nempleado integer
);


ALTER TABLE public.periodos_promep OWNER TO desarrollo1;

--
-- Name: periodos_promep_id_periodo_seq; Type: SEQUENCE; Schema: public; Owner: desarrollo1
--

CREATE SEQUENCE public.periodos_promep_id_periodo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.periodos_promep_id_periodo_seq OWNER TO desarrollo1;

--
-- Name: periodos_promep_id_periodo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desarrollo1
--

ALTER SEQUENCE public.periodos_promep_id_periodo_seq OWNED BY public.periodos_promep.id_periodo;


--
-- Name: pos_uni; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.pos_uni (
    nposgrado integer NOT NULL,
    nunidad integer NOT NULL,
    coordinador integer,
    cgeneral character varying(2)
);


ALTER TABLE public.pos_uni OWNER TO desarrollo1;

--
-- Name: posgrados; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.posgrados (
    nposgrado integer NOT NULL,
    posgrado character varying(100) NOT NULL,
    grado character varying(25) NOT NULL,
    narea integer NOT NULL,
    pnpc character varying(2),
    vigencia character varying(10),
    tipo_prog character varying(30),
    modalidad character varying(30),
    perfil_curr text,
    perfil_ing text,
    perfil_egre text,
    becas text,
    fechas_apertura text,
    tipo_plan character varying(20),
    vigente character varying(1),
    pagina character varying(100)
);


ALTER TABLE public.posgrados OWNER TO desarrollo1;

--
-- Name: predepa; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.predepa (
    nempleado integer,
    nivel integer
);


ALTER TABLE public.predepa OWNER TO desarrollo1;

--
-- Name: preguntas; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.preguntas (
    id_indicador integer NOT NULL,
    narea integer NOT NULL,
    pregunta character varying(150) NOT NULL,
    id_pregunta integer NOT NULL
);


ALTER TABLE public.preguntas OWNER TO desarrollo1;

--
-- Name: preguntas_id_pregunta_seq; Type: SEQUENCE; Schema: public; Owner: desarrollo1
--

CREATE SEQUENCE public.preguntas_id_pregunta_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.preguntas_id_pregunta_seq OWNER TO desarrollo1;

--
-- Name: preguntas_id_pregunta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desarrollo1
--

ALTER SEQUENCE public.preguntas_id_pregunta_seq OWNED BY public.preguntas.id_pregunta;


--
-- Name: presupuesto; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.presupuesto (
    clave character varying(15) NOT NULL,
    ncuenta character varying(20),
    periodo1 double precision,
    periodo2 double precision,
    justifica text
);


ALTER TABLE public.presupuesto OWNER TO desarrollo1;

--
-- Name: prod_proy; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.prod_proy (
    clave character varying(15),
    cproducto character varying(5),
    consecutivo integer NOT NULL
);


ALTER TABLE public.prod_proy OWNER TO desarrollo1;

--
-- Name: prod_proy_consecutivo_seq; Type: SEQUENCE; Schema: public; Owner: desarrollo1
--

CREATE SEQUENCE public.prod_proy_consecutivo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.prod_proy_consecutivo_seq OWNER TO desarrollo1;

--
-- Name: prod_proy_consecutivo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desarrollo1
--

ALTER SEQUENCE public.prod_proy_consecutivo_seq OWNED BY public.prod_proy.consecutivo;


--
-- Name: produccion; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.produccion (
    clave character varying(15) NOT NULL,
    pra integer,
    pla integer,
    cla integer,
    pld integer,
    prda integer,
    pp integer,
    pci integer,
    pcn integer,
    cu integer,
    tgp integer,
    tgl integer,
    pss integer,
    gr1 double precision,
    f1 character varying(50),
    gr2 double precision,
    f2 character varying(50),
    gr3 double precision,
    f3 character varying(50),
    gr4 double precision,
    f4 character varying(50),
    gr5 double precision,
    f5 character varying(50),
    comentario text
);


ALTER TABLE public.produccion OWNER TO desarrollo1;

--
-- Name: productos; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.productos (
    clave character varying(15) NOT NULL,
    av integer,
    aa integer,
    ari integer,
    cl integer,
    cs integer,
    ca integer,
    di integer,
    it integer,
    l integer,
    mo integer,
    me integer,
    pat integer,
    pci integer,
    pcn integer,
    ptt integer,
    p integer,
    pdt integer,
    pe integer,
    pp integer,
    prd integer,
    rt integer,
    ss integer,
    td integer,
    tm integer,
    tl integer
);


ALTER TABLE public.productos OWNER TO desarrollo1;

--
-- Name: prof_inv; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.prof_inv (
    nempleado integer NOT NULL,
    periodo character varying(10) NOT NULL,
    tipo character varying(2) NOT NULL,
    estatus character(1) NOT NULL,
    desde character varying(10),
    folio integer,
    comentario character varying(255),
    condicionado character(1),
    inicio date
);


ALTER TABLE public.prof_inv OWNER TO desarrollo1;

--
-- Name: promep; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.promep (
    nempleado integer NOT NULL,
    vigente character(1) NOT NULL
);


ALTER TABLE public.promep OWNER TO desarrollo1;

--
-- Name: promep2; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.promep2 (
    nempleado integer NOT NULL,
    promep character varying(15),
    consecutivo character varying(1),
    estatus character varying(25),
    comentarios character varying(250)
);


ALTER TABLE public.promep2 OWNER TO desarrollo1;

--
-- Name: prorrogas; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.prorrogas (
    clave character varying(15),
    cprorroga integer NOT NULL,
    descripcion character varying(255),
    periodo character varying(10)
);


ALTER TABLE public.prorrogas OWNER TO desarrollo1;

--
-- Name: prorrogas_cprorroga_seq; Type: SEQUENCE; Schema: public; Owner: desarrollo1
--

CREATE SEQUENCE public.prorrogas_cprorroga_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.prorrogas_cprorroga_seq OWNER TO desarrollo1;

--
-- Name: prorrogas_cprorroga_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desarrollo1
--

ALTER SEQUENCE public.prorrogas_cprorroga_seq OWNED BY public.prorrogas.cprorroga;


--
-- Name: proyectos; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.proyectos (
    clave character varying(15) NOT NULL,
    nconvocatoria integer NOT NULL,
    titulo character varying(350) NOT NULL,
    narea integer NOT NULL,
    maprobado double precision,
    nunidad integer NOT NULL,
    tipo character varying(1),
    tutor integer,
    clgc integer,
    alcance character varying(25),
    impacto text,
    resumen text,
    antecedentes text,
    objetivos text,
    metas text,
    metodologia text,
    literatura text,
    comentarios text,
    inter1 character varying(80),
    inter2 character varying(80),
    inter3 character varying(80),
    anexo character varying(1),
    cestatus integer,
    inicio character varying(10),
    final character varying(10),
    tipoinv character varying(25),
    incidencia character varying(15),
    inst1 character varying(80),
    inst2 character varying(80),
    inst3 character varying(80),
    presupuesto text,
    tipoinst1 character varying(30),
    tipoinst2 character varying(30),
    tipoinst3 character varying(30),
    tipoproy character(1),
    iniciom character varying(10),
    fina character varying(10),
    duracion double precision,
    justificacion text,
    lin_pos integer,
    fuente character varying(30),
    tfuente character varying(80),
    conv_ext character varying(80),
    pos_uni integer,
    propiedad text,
    eseguimiento integer,
    f_registro date
);


ALTER TABLE public.proyectos OWNER TO desarrollo1;

--
-- Name: rangos; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.rangos (
    rango character varying(20) NOT NULL,
    maximo double precision NOT NULL,
    minimo double precision NOT NULL
);


ALTER TABLE public.rangos OWNER TO desarrollo1;

--
-- Name: relacion; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.relacion (
    clave character varying(15) NOT NULL,
    nempleado integer NOT NULL,
    tipo character varying(15) NOT NULL,
    actividades text,
    ccuerpo integer
);


ALTER TABLE public.relacion OWNER TO desarrollo1;

--
-- Name: sni; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.sni (
    nempleado integer NOT NULL,
    nivel character varying(15) NOT NULL,
    expediente integer,
    inicio character varying(15),
    fin character varying(15),
    periodo character varying(10),
    vigente character(1)
);


ALTER TABLE public.sni OWNER TO desarrollo1;

--
-- Name: subcuentas; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.subcuentas (
    ncuenta character varying(20) NOT NULL,
    cuenta character varying(100)
);


ALTER TABLE public.subcuentas OWNER TO desarrollo1;

--
-- Name: tipo_fuente; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.tipo_fuente (
    ctipofuente integer NOT NULL,
    fuente character varying(30),
    cfuente integer
);


ALTER TABLE public.tipo_fuente OWNER TO desarrollo1;

--
-- Name: tipo_fuente_ctipofuente_seq; Type: SEQUENCE; Schema: public; Owner: desarrollo1
--

CREATE SEQUENCE public.tipo_fuente_ctipofuente_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tipo_fuente_ctipofuente_seq OWNER TO desarrollo1;

--
-- Name: tipo_fuente_ctipofuente_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: desarrollo1
--

ALTER SEQUENCE public.tipo_fuente_ctipofuente_seq OWNED BY public.tipo_fuente.ctipofuente;


--
-- Name: unidades; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.unidades (
    nunidad integer NOT NULL,
    unidad character varying(80) NOT NULL,
    responsable character varying(80),
    cargo_resp character varying(50),
    correo_resp character varying(50),
    administrador character varying(80),
    correo_admon character varying(50),
    municipio character varying(15),
    direccion character varying(100),
    telefono character varying(50),
    fax character varying(50),
    pagina character varying(100),
    tipo_unidad character varying(20),
    campus character varying(20),
    nempleado integer
);


ALTER TABLE public.unidades OWNER TO desarrollo1;

--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: desarrollo1
--

CREATE TABLE public.usuarios (
    usuario character varying(20) NOT NULL,
    nempleado integer,
    nombre character varying(80),
    tipo character varying(20) NOT NULL,
    nunidad integer NOT NULL,
    nposgrado integer,
    correo character varying(80),
    password character varying(20)
);


ALTER TABLE public.usuarios OWNER TO desarrollo1;

--
-- Name: anexos nanexo; Type: DEFAULT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.anexos ALTER COLUMN nanexo SET DEFAULT nextval('public.anexos_nanexo_seq'::regclass);


--
-- Name: areas id_area; Type: DEFAULT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.areas ALTER COLUMN id_area SET DEFAULT nextval('public.areas_id_area_seq'::regclass);


--
-- Name: autorizacion id_com; Type: DEFAULT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.autorizacion ALTER COLUMN id_com SET DEFAULT nextval('public.autorizacion_id_com_seq'::regclass);


--
-- Name: becarios cbecario; Type: DEFAULT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.becarios ALTER COLUMN cbecario SET DEFAULT nextval('public.becarios_cbecario_seq'::regclass);


--
-- Name: cat_productos consecutivo; Type: DEFAULT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.cat_productos ALTER COLUMN consecutivo SET DEFAULT nextval('public.cat_productos_consecutivo_seq'::regclass);


--
-- Name: cronograma cons; Type: DEFAULT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.cronograma ALTER COLUMN cons SET DEFAULT nextval('public.cronograma_cons_seq'::regclass);


--
-- Name: empresas nempresa; Type: DEFAULT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.empresas ALTER COLUMN nempresa SET DEFAULT nextval('public.empresas_nempresa_seq'::regclass);


--
-- Name: estatus cestatus; Type: DEFAULT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.estatus ALTER COLUMN cestatus SET DEFAULT nextval('public.estatus_cestatus_seq'::regclass);


--
-- Name: indicadores id_indicador; Type: DEFAULT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.indicadores ALTER COLUMN id_indicador SET DEFAULT nextval('public.indicadores_id_indicador_seq'::regclass);


--
-- Name: informes cinforme; Type: DEFAULT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.informes ALTER COLUMN cinforme SET DEFAULT nextval('public.informes_cinforme_seq'::regclass);


--
-- Name: lgac clgac; Type: DEFAULT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.lgac ALTER COLUMN clgac SET DEFAULT nextval('public.lgac_clgac_seq'::regclass);


--
-- Name: lineas_pos clinea; Type: DEFAULT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.lineas_pos ALTER COLUMN clinea SET DEFAULT nextval('public.lineas_pos_clinea_seq'::regclass);


--
-- Name: mat_maestro id_mat_maestro; Type: DEFAULT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.mat_maestro ALTER COLUMN id_mat_maestro SET DEFAULT nextval('public.mat_maestro_id_mat_maestro_seq'::regclass);


--
-- Name: metas cons; Type: DEFAULT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.metas ALTER COLUMN cons SET DEFAULT nextval('public.metas_cons_seq'::regclass);


--
-- Name: partext npartext; Type: DEFAULT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.partext ALTER COLUMN npartext SET DEFAULT nextval('public.partext_npartext_seq'::regclass);


--
-- Name: periodos_promep id_periodo; Type: DEFAULT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.periodos_promep ALTER COLUMN id_periodo SET DEFAULT nextval('public.periodos_promep_id_periodo_seq'::regclass);


--
-- Name: preguntas id_pregunta; Type: DEFAULT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.preguntas ALTER COLUMN id_pregunta SET DEFAULT nextval('public.preguntas_id_pregunta_seq'::regclass);


--
-- Name: prod_proy consecutivo; Type: DEFAULT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.prod_proy ALTER COLUMN consecutivo SET DEFAULT nextval('public.prod_proy_consecutivo_seq'::regclass);


--
-- Name: prorrogas cprorroga; Type: DEFAULT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.prorrogas ALTER COLUMN cprorroga SET DEFAULT nextval('public.prorrogas_cprorroga_seq'::regclass);


--
-- Name: tipo_fuente ctipofuente; Type: DEFAULT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.tipo_fuente ALTER COLUMN ctipofuente SET DEFAULT nextval('public.tipo_fuente_ctipofuente_seq'::regclass);


--
-- Name: alumnos alumnos_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.alumnos
    ADD CONSTRAINT alumnos_pkey PRIMARY KEY (matricula, periodo);


--
-- Name: anexos anexos_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.anexos
    ADD CONSTRAINT anexos_pkey PRIMARY KEY (nanexo);


--
-- Name: areas_con areas_con_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.areas_con
    ADD CONSTRAINT areas_con_pkey PRIMARY KEY (narea);


--
-- Name: areas areas_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.areas
    ADD CONSTRAINT areas_pkey PRIMARY KEY (id_area);


--
-- Name: bajas bajas_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.bajas
    ADD CONSTRAINT bajas_pkey PRIMARY KEY (nempleado);


--
-- Name: becarios becarios_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.becarios
    ADD CONSTRAINT becarios_pkey PRIMARY KEY (cbecario);


--
-- Name: cat_productos cat_productos_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.cat_productos
    ADD CONSTRAINT cat_productos_pkey PRIMARY KEY (cproducto);


--
-- Name: categorias categorias_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (c_categoria);


--
-- Name: integrantes ccuerp_integrante; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.integrantes
    ADD CONSTRAINT ccuerp_integrante PRIMARY KEY (ccuerpo, nempleado);


--
-- Name: lgac ccuerp_lgac; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.lgac
    ADD CONSTRAINT ccuerp_lgac PRIMARY KEY (ccuerpo, clgac);


--
-- Name: proyectos clave; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT clave PRIMARY KEY (clave);


--
-- Name: foncon clave_cfoncon; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.foncon
    ADD CONSTRAINT clave_cfoncon PRIMARY KEY (clave, cfoncon);


--
-- Name: relacion clave_nempleado; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.relacion
    ADD CONSTRAINT clave_nempleado PRIMARY KEY (clave, nempleado);


--
-- Name: partext clave_npartext; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.partext
    ADD CONSTRAINT clave_npartext PRIMARY KEY (clave, npartext);


--
-- Name: cuerpo cuerpo_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.cuerpo
    ADD CONSTRAINT cuerpo_pkey PRIMARY KEY (ccuerpo);


--
-- Name: cuerpos cuerpos_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.cuerpos
    ADD CONSTRAINT cuerpos_pkey PRIMARY KEY (ccuerpo);


--
-- Name: des des_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.des
    ADD CONSTRAINT des_pkey PRIMARY KEY (cdes);


--
-- Name: emp_uabc emp_uabc_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.emp_uabc
    ADD CONSTRAINT emp_uabc_pkey PRIMARY KEY (nempleado);


--
-- Name: empresas empresas_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.empresas
    ADD CONSTRAINT empresas_pkey PRIMARY KEY (nempresa);


--
-- Name: estatus estatus_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.estatus
    ADD CONSTRAINT estatus_pkey PRIMARY KEY (cestatus);


--
-- Name: fuente fuente_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.fuente
    ADD CONSTRAINT fuente_pkey PRIMARY KEY (cfuente);


--
-- Name: indicadores indicadores_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.indicadores
    ADD CONSTRAINT indicadores_pkey PRIMARY KEY (id_indicador);


--
-- Name: informes informes_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.informes
    ADD CONSTRAINT informes_pkey PRIMARY KEY (cinforme);


--
-- Name: licenciaturas licenciaturas_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.licenciaturas
    ADD CONSTRAINT licenciaturas_pkey PRIMARY KEY (clave);


--
-- Name: lineas_pos lineas_pos_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.lineas_pos
    ADD CONSTRAINT lineas_pos_pkey PRIMARY KEY (clinea);


--
-- Name: mat_maestro mat_maestro_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.mat_maestro
    ADD CONSTRAINT mat_maestro_pkey PRIMARY KEY (id_mat_maestro);


--
-- Name: materias materias_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.materias
    ADD CONSTRAINT materias_pkey PRIMARY KEY (cmateria);


--
-- Name: empleados nemp; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT nemp PRIMARY KEY (nempleado);


--
-- Name: prof_inv nemp_periodo; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.prof_inv
    ADD CONSTRAINT nemp_periodo PRIMARY KEY (nempleado, periodo);


--
-- Name: posgrados npos; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.posgrados
    ADD CONSTRAINT npos PRIMARY KEY (nposgrado);


--
-- Name: nprogramatico nprogramatico_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.nprogramatico
    ADD CONSTRAINT nprogramatico_pkey PRIMARY KEY (clave);


--
-- Name: periodos_promep periodos_promep_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.periodos_promep
    ADD CONSTRAINT periodos_promep_pkey PRIMARY KEY (id_periodo);


--
-- Name: pos_uni pos_uni_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.pos_uni
    ADD CONSTRAINT pos_uni_pkey PRIMARY KEY (nposgrado, nunidad);


--
-- Name: preguntas preguntas_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.preguntas
    ADD CONSTRAINT preguntas_pkey PRIMARY KEY (id_pregunta);


--
-- Name: produccion produccion_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.produccion
    ADD CONSTRAINT produccion_pkey PRIMARY KEY (clave);


--
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (clave);


--
-- Name: promep2 promep2_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.promep2
    ADD CONSTRAINT promep2_pkey PRIMARY KEY (nempleado);


--
-- Name: promep promep_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.promep
    ADD CONSTRAINT promep_pkey PRIMARY KEY (nempleado);


--
-- Name: prorrogas prorrogas_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.prorrogas
    ADD CONSTRAINT prorrogas_pkey PRIMARY KEY (cprorroga);


--
-- Name: subcuentas subcuentas_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.subcuentas
    ADD CONSTRAINT subcuentas_pkey PRIMARY KEY (ncuenta);


--
-- Name: tipo_fuente tipo_fuente_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.tipo_fuente
    ADD CONSTRAINT tipo_fuente_pkey PRIMARY KEY (ctipofuente);


--
-- Name: unidades unidades_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.unidades
    ADD CONSTRAINT unidades_pkey PRIMARY KEY (nunidad);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (usuario);


--
-- Name: alumnos alumnos_nposgrado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.alumnos
    ADD CONSTRAINT alumnos_nposgrado_fkey FOREIGN KEY (nposgrado) REFERENCES public.posgrados(nposgrado);


--
-- Name: alumnos alumnos_nunidad_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.alumnos
    ADD CONSTRAINT alumnos_nunidad_fkey FOREIGN KEY (nunidad) REFERENCES public.unidades(nunidad);


--
-- Name: anexos anexos_clave_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.anexos
    ADD CONSTRAINT anexos_clave_fkey FOREIGN KEY (clave) REFERENCES public.proyectos(clave);


--
-- Name: calificaciones calificaciones_indicador_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.calificaciones
    ADD CONSTRAINT calificaciones_indicador_fkey FOREIGN KEY (indicador) REFERENCES public.indicadores(id_indicador);


--
-- Name: calificaciones calificaciones_ma_mat_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.calificaciones
    ADD CONSTRAINT calificaciones_ma_mat_fkey FOREIGN KEY (ma_mat) REFERENCES public.mat_maestro(id_mat_maestro);


--
-- Name: int_cuerpos cuerpo_exis; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.int_cuerpos
    ADD CONSTRAINT cuerpo_exis FOREIGN KEY (ccuerpo) REFERENCES public.cuerpos(ccuerpo);


--
-- Name: prod_proy e_claveproy; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.prod_proy
    ADD CONSTRAINT e_claveproy FOREIGN KEY (clave) REFERENCES public.proyectos(clave);


--
-- Name: prod_proy e_cproducto; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.prod_proy
    ADD CONSTRAINT e_cproducto FOREIGN KEY (cproducto) REFERENCES public.cat_productos(cproducto);


--
-- Name: empresas empresas_clave_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.empresas
    ADD CONSTRAINT empresas_clave_fkey FOREIGN KEY (clave) REFERENCES public.proyectos(clave);


--
-- Name: foncon existe_clave; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.foncon
    ADD CONSTRAINT existe_clave FOREIGN KEY (clave) REFERENCES public.proyectos(clave);


--
-- Name: becarios existe_clave; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.becarios
    ADD CONSTRAINT existe_clave FOREIGN KEY (clave) REFERENCES public.proyectos(clave);


--
-- Name: partext existe_clave; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.partext
    ADD CONSTRAINT existe_clave FOREIGN KEY (clave) REFERENCES public.proyectos(clave);


--
-- Name: cronograma existe_clave; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.cronograma
    ADD CONSTRAINT existe_clave FOREIGN KEY (clave) REFERENCES public.proyectos(clave);


--
-- Name: presupuesto existe_clave; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.presupuesto
    ADD CONSTRAINT existe_clave FOREIGN KEY (clave) REFERENCES public.proyectos(clave);


--
-- Name: informes existe_clave; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.informes
    ADD CONSTRAINT existe_clave FOREIGN KEY (clave) REFERENCES public.proyectos(clave);


--
-- Name: prorrogas existe_clave; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.prorrogas
    ADD CONSTRAINT existe_clave FOREIGN KEY (clave) REFERENCES public.proyectos(clave);


--
-- Name: metas existe_clave2; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.metas
    ADD CONSTRAINT existe_clave2 FOREIGN KEY (clave) REFERENCES public.proyectos(clave);


--
-- Name: produccion existe_clave3; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.produccion
    ADD CONSTRAINT existe_clave3 FOREIGN KEY (clave) REFERENCES public.proyectos(clave);


--
-- Name: lic_uni existe_clave_licuni; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.lic_uni
    ADD CONSTRAINT existe_clave_licuni FOREIGN KEY (nunidad) REFERENCES public.unidades(nunidad);


--
-- Name: lic_uni existe_clavelic; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.lic_uni
    ADD CONSTRAINT existe_clavelic FOREIGN KEY (clave) REFERENCES public.licenciaturas(clave);


--
-- Name: nprogramatico existe_clavep; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.nprogramatico
    ADD CONSTRAINT existe_clavep FOREIGN KEY (clave) REFERENCES public.proyectos(clave);


--
-- Name: lgac existe_cuerpo2; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.lgac
    ADD CONSTRAINT existe_cuerpo2 FOREIGN KEY (ccuerpo) REFERENCES public.cuerpos(ccuerpo);


--
-- Name: presupuesto existe_ncuenta; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.presupuesto
    ADD CONSTRAINT existe_ncuenta FOREIGN KEY (ncuenta) REFERENCES public.subcuentas(ncuenta);


--
-- Name: relacion existe_nemp; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.relacion
    ADD CONSTRAINT existe_nemp FOREIGN KEY (nempleado) REFERENCES public.empleados(nempleado);


--
-- Name: prof_inv existe_nemp2; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.prof_inv
    ADD CONSTRAINT existe_nemp2 FOREIGN KEY (nempleado) REFERENCES public.empleados(nempleado);


--
-- Name: usuarios existe_nuni; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT existe_nuni FOREIGN KEY (nunidad) REFERENCES public.unidades(nunidad);


--
-- Name: becarios existe_nunidad; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.becarios
    ADD CONSTRAINT existe_nunidad FOREIGN KEY (nunidad) REFERENCES public.unidades(nunidad);


--
-- Name: relacion existe_proy; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.relacion
    ADD CONSTRAINT existe_proy FOREIGN KEY (clave) REFERENCES public.proyectos(clave);


--
-- Name: productos existe_proyprod; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT existe_proyprod FOREIGN KEY (clave) REFERENCES public.proyectos(clave);


--
-- Name: int_cuerpos integrante_exis; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.int_cuerpos
    ADD CONSTRAINT integrante_exis FOREIGN KEY (nempleado) REFERENCES public.empleados(nempleado);


--
-- Name: lineas_pos lineas_pos; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.lineas_pos
    ADD CONSTRAINT lineas_pos FOREIGN KEY (nposgrado) REFERENCES public.posgrados(nposgrado);


--
-- Name: mat_maestro mat_maestro_cmateria_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.mat_maestro
    ADD CONSTRAINT mat_maestro_cmateria_fkey FOREIGN KEY (cmateria) REFERENCES public.materias(cmateria);


--
-- Name: mat_maestro mat_maestro_nempleado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.mat_maestro
    ADD CONSTRAINT mat_maestro_nempleado_fkey FOREIGN KEY (nempleado) REFERENCES public.empleados(nempleado);


--
-- Name: mat_maestro mat_maestro_nunidad_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.mat_maestro
    ADD CONSTRAINT mat_maestro_nunidad_fkey FOREIGN KEY (nunidad) REFERENCES public.unidades(nunidad);


--
-- Name: materias materias_nposgrado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.materias
    ADD CONSTRAINT materias_nposgrado_fkey FOREIGN KEY (nposgrado) REFERENCES public.posgrados(nposgrado);


--
-- Name: proyectos narea_exis; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT narea_exis FOREIGN KEY (narea) REFERENCES public.areas_con(narea);


--
-- Name: periodos_promep periodos_promep_nempleado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.periodos_promep
    ADD CONSTRAINT periodos_promep_nempleado_fkey FOREIGN KEY (nempleado) REFERENCES public.promep2(nempleado);


--
-- Name: pos_uni pos_uni_nposgrado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.pos_uni
    ADD CONSTRAINT pos_uni_nposgrado_fkey FOREIGN KEY (nposgrado) REFERENCES public.posgrados(nposgrado);


--
-- Name: pos_uni pos_uni_nunidad_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.pos_uni
    ADD CONSTRAINT pos_uni_nunidad_fkey FOREIGN KEY (nunidad) REFERENCES public.unidades(nunidad);


--
-- Name: posgrados posgrados_narea_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.posgrados
    ADD CONSTRAINT posgrados_narea_fkey FOREIGN KEY (narea) REFERENCES public.areas_con(narea);


--
-- Name: preguntas preguntas_id_indicador_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.preguntas
    ADD CONSTRAINT preguntas_id_indicador_fkey FOREIGN KEY (id_indicador) REFERENCES public.indicadores(id_indicador);


--
-- Name: preguntas preguntas_narea_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.preguntas
    ADD CONSTRAINT preguntas_narea_fkey FOREIGN KEY (narea) REFERENCES public.areas_con(narea);


--
-- Name: promep2 promep2_nempleado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.promep2
    ADD CONSTRAINT promep2_nempleado_fkey FOREIGN KEY (nempleado) REFERENCES public.empleados(nempleado);


--
-- Name: sni sni_exis; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.sni
    ADD CONSTRAINT sni_exis FOREIGN KEY (nempleado) REFERENCES public.empleados(nempleado);


--
-- Name: tipo_fuente tipo_fuente_cfuente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.tipo_fuente
    ADD CONSTRAINT tipo_fuente_cfuente_fkey FOREIGN KEY (cfuente) REFERENCES public.fuente(cfuente);


--
-- Name: empleados unidad_exis; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT unidad_exis FOREIGN KEY (nunidad) REFERENCES public.unidades(nunidad);


--
-- Name: proyectos unidad_exis1; Type: FK CONSTRAINT; Schema: public; Owner: desarrollo1
--

ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT unidad_exis1 FOREIGN KEY (nunidad) REFERENCES public.unidades(nunidad);


--
-- PostgreSQL database dump complete
--

