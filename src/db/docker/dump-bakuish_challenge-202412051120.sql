--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6 (Debian 16.6-1.pgdg120+1)
-- Dumped by pg_dump version 16.3

-- Started on 2024-12-05 11:20:34

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

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3388 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16395)
-- Name: Users; Type: TABLE; Schema: public; Owner: bakuish
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    username character varying(255),
    password character varying(255),
    "userId" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO bakuish;

--
-- TOC entry 217 (class 1259 OID 16394)
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: bakuish
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Users_id_seq" OWNER TO bakuish;

--
-- TOC entry 3389 (class 0 OID 0)
-- Dependencies: 217
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bakuish
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- TOC entry 220 (class 1259 OID 16404)
-- Name: courses; Type: TABLE; Schema: public; Owner: bakuish
--

CREATE TABLE public.courses (
    id integer NOT NULL,
    courses_name character varying NOT NULL,
    required_course character varying
);


ALTER TABLE public.courses OWNER TO bakuish;

--
-- TOC entry 219 (class 1259 OID 16403)
-- Name: courses_id_seq; Type: SEQUENCE; Schema: public; Owner: bakuish
--

CREATE SEQUENCE public.courses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.courses_id_seq OWNER TO bakuish;

--
-- TOC entry 3390 (class 0 OID 0)
-- Dependencies: 219
-- Name: courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bakuish
--

ALTER SEQUENCE public.courses_id_seq OWNED BY public.courses.id;


--
-- TOC entry 222 (class 1259 OID 16413)
-- Name: user_courses; Type: TABLE; Schema: public; Owner: bakuish
--

CREATE TABLE public.user_courses (
    id integer NOT NULL,
    is_complete boolean DEFAULT false NOT NULL,
    fk_id_user integer NOT NULL,
    fk_id_course integer NOT NULL,
    is_active boolean DEFAULT false
);


ALTER TABLE public.user_courses OWNER TO bakuish;

--
-- TOC entry 221 (class 1259 OID 16412)
-- Name: user_courses_id_seq; Type: SEQUENCE; Schema: public; Owner: bakuish
--

CREATE SEQUENCE public.user_courses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_courses_id_seq OWNER TO bakuish;

--
-- TOC entry 3391 (class 0 OID 0)
-- Dependencies: 221
-- Name: user_courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bakuish
--

ALTER SEQUENCE public.user_courses_id_seq OWNED BY public.user_courses.id;


--
-- TOC entry 216 (class 1259 OID 16386)
-- Name: users; Type: TABLE; Schema: public; Owner: bakuish
--

CREATE TABLE public.users (
    id integer NOT NULL,
    user_name character varying NOT NULL,
    password character varying NOT NULL,
    userid uuid NOT NULL
);


ALTER TABLE public.users OWNER TO bakuish;

--
-- TOC entry 215 (class 1259 OID 16385)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: bakuish
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO bakuish;

--
-- TOC entry 3392 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bakuish
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3219 (class 2604 OID 16398)
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: bakuish
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- TOC entry 3220 (class 2604 OID 16407)
-- Name: courses id; Type: DEFAULT; Schema: public; Owner: bakuish
--

ALTER TABLE ONLY public.courses ALTER COLUMN id SET DEFAULT nextval('public.courses_id_seq'::regclass);


--
-- TOC entry 3221 (class 2604 OID 16416)
-- Name: user_courses id; Type: DEFAULT; Schema: public; Owner: bakuish
--

ALTER TABLE ONLY public.user_courses ALTER COLUMN id SET DEFAULT nextval('public.user_courses_id_seq'::regclass);


--
-- TOC entry 3218 (class 2604 OID 16389)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: bakuish
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3378 (class 0 OID 16395)
-- Dependencies: 218
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: bakuish
--



--
-- TOC entry 3380 (class 0 OID 16404)
-- Dependencies: 220
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: bakuish
--

INSERT INTO public.courses VALUES (1, 'Finance', NULL);
INSERT INTO public.courses VALUES (2, 'Investment', 'Finance');
INSERT INTO public.courses VALUES (3, 'InvestmentManagement', 'Investment');
INSERT INTO public.courses VALUES (4, 'PortfolioTheories', 'Investment');
INSERT INTO public.courses VALUES (5, 'InvestmentStyle', 'InvestmentManagement');
INSERT INTO public.courses VALUES (6, 'PortfolioConstruction', 'PortfolioTheories');


--
-- TOC entry 3382 (class 0 OID 16413)
-- Dependencies: 222
-- Data for Name: user_courses; Type: TABLE DATA; Schema: public; Owner: bakuish
--

INSERT INTO public.user_courses VALUES (8, false, 1, 4, false);
INSERT INTO public.user_courses VALUES (7, false, 1, 3, false);
INSERT INTO public.user_courses VALUES (5, false, 1, 1, true);
INSERT INTO public.user_courses VALUES (6, false, 1, 2, false);


--
-- TOC entry 3376 (class 0 OID 16386)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: bakuish
--

INSERT INTO public.users VALUES (8, 'ali3', '$2b$10$KqZyunxOwIShVNvfYT1XbOTAMXr7rGaF2ZR3GXbxxg/A/DSdE1KrC', '8a314f93-db3b-4e32-9508-21a2e77feed4');
INSERT INTO public.users VALUES (9, 'ali4', '$2b$10$xqKRiAonrccmuiGJgQl3XeChjkLvl4/X5o1DHzHkPj5m/J3vd3.0u', '23b5d0f7-076d-4e38-9011-78f059810b6f');


--
-- TOC entry 3393 (class 0 OID 0)
-- Dependencies: 217
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bakuish
--

SELECT pg_catalog.setval('public."Users_id_seq"', 1, false);


--
-- TOC entry 3394 (class 0 OID 0)
-- Dependencies: 219
-- Name: courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bakuish
--

SELECT pg_catalog.setval('public.courses_id_seq', 6, true);


--
-- TOC entry 3395 (class 0 OID 0)
-- Dependencies: 221
-- Name: user_courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bakuish
--

SELECT pg_catalog.setval('public.user_courses_id_seq', 8, true);


--
-- TOC entry 3396 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bakuish
--

SELECT pg_catalog.setval('public.users_id_seq', 9, true);


--
-- TOC entry 3227 (class 2606 OID 16402)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: bakuish
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 3229 (class 2606 OID 16411)
-- Name: courses courses_pk; Type: CONSTRAINT; Schema: public; Owner: bakuish
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pk PRIMARY KEY (id);


--
-- TOC entry 3231 (class 2606 OID 16421)
-- Name: user_courses user_courses_pk; Type: CONSTRAINT; Schema: public; Owner: bakuish
--

ALTER TABLE ONLY public.user_courses
    ADD CONSTRAINT user_courses_pk PRIMARY KEY (id);


--
-- TOC entry 3225 (class 2606 OID 16393)
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: bakuish
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


-- Completed on 2024-12-05 11:20:34

--
-- PostgreSQL database dump complete
--

