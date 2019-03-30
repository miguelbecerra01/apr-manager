--drop database if exists aprdb;
--create new database aprdb;

drop table if exists payments  cascade;--
drop table if exists payments_types  cascade;--
drop table if exists payments_methods  cascade;--
drop table if exists statements  cascade;--
drop table if exists readings  cascade;--
drop table if exists meters  cascade;--
drop table if exists users  cascade;--
drop table if exists payments_list  cascade;--
drop table if exists billing_period  cascade; --
drop table if exists organizations  cascade;--
drop table if exists users_accounts cascade;--
drop table if exists accounts  cascade;--
drop table if exists statements_charges cascade;
drop table if exists charges cascade;
drop table if exists charge_types cascade;--
drop table if exists subsidies cascade;
drop table if exists subsidies_types cascade;
drop table if exists user_roles cascade;

create table billing_period(
	id date not null primary key,
	since_date date not null,
	until_date date not null,
	is_active boolean,
	created_at timestamp not null default now()	
); 
 
create table payments_types(
	id serial primary key,
	name varchar(30) not null
);

create table payments_methods(
	id serial primary key,
	name varchar(30) not null
);

create table payments(
 id serial primary key,
 amount int not null,
 id_payment_method int not null,
 id_payment_type int not null,
 created_at timestamp not null default now(),
 foreign key (id_payment_method) references payments_methods(id),
 foreign key (id_payment_type) references payments_types(id)
);
 
create table user_roles(
id serial not null primary key,
name varchar(30) not null
);

create table users (
	id varchar(10) not null primary key ,
	id_user_role int not null,
	document_number varchar(10),
	first_name varchar(50) not null, 
	last_name varchar(50) not null,	
	mother_surname varchar(50),
	gender varchar(1) not null,
	email varchar(50) not null,	 
	phone varchar(10),
	created_at timestamp not null default now(),
	unique(id, id_user_role),
	foreign key (id_user_role) references user_roles(id)
);



create table meters (	
	id varchar(10) primary key not null,
	name varchar(50),
	barcode varchar(50),
	created_at timestamp not null default now()
);

create table organizations(
id varchar(20) not null primary key,
type varchar(50),
name varchar(100) not null,
line_of_business varchar(50),
street_name varchar(50),
house_number varchar(10),
sector varchar(50),
id_commune int not null,
created_at timestamp not null default now(),
foreign key (id_commune) references communes(id)
);

create table accounts(
id varchar(10) not null primary key,
street_name varchar(50) not null,
house_number varchar(50),
sector varchar(50),
id_commune int not null,
id_meter varchar(10) not null,
id_organization varchar(20) not null,
created_at timestamp not null default now(),
foreign key (id_commune) references communes(id),
foreign key (id_meter) references meters(id),
foreign key (id_organization) references organizations(id)
);


create table users_accounts(
id_user varchar(10) not null,
id_account varchar(10) not null,
 created_at timestamp not null default now(),
unique(id_user, id_account),
foreign key (id_user) references users(id),
foreign key (id_account) references accounts(id)
);



create table readings(
 id serial primary key,
 id_previous int not null default 0,
 value int not null,
 id_meter varchar(10) not null,
 created_at timestamp not null default current_date,
 unique(id,id_previous),
 foreign key(id_meter) references meters(id),
 foreign key(id,id_previous) references readings(id,id_previous)
);


create table statements (
 id serial not null primary key,
 id_billing_period date not null,
 id_account varchar(10) not null,
 id_reading int not null,
 ticket_number varchar(10) not null,
 total_amount int not null,
 status varchar(10) not null,
 emission_date date not null,
 due_date date not null,
 created_at timestamp not null default now(),
 unique(id, id_billing_period),
 foreign key (id_billing_period) references billing_period(id),
 foreign key (id_reading) references readings(id),
 foreign key (id_account) references accounts(id)
);

 
create table payments_list(
	id_statement int not null,
	id_payment int not null,
	created_at timestamp not null default now(),
	unique(id_statement, id_payment),
	foreign key (id_statement) references statements(id),
	foreign key (id_payment) references payments(id)
	 
);

create table charges_types(
	id serial primary key,
	name varchar(30) not null,
	 created_at timestamp not null default now()
);

create table charges(
 id serial primary key,
 amount int not null,
 description varchar(100),
 id_charge_type int not null,
 created_at timestamp not null default now(),
 foreign key (id_charge_type) references charges_types(id)
);
  
create table statements_charges(
	id_statement int not null,
	id_charge int not null,
	created_at timestamp not null default now(),
	unique(id_statement, id_charge),
	foreign key (id_statement) references statements(id),
	foreign key (id_charge) references charges(id)
	 
);

create table subsidies_types(
id serial not null primary key,
name varchar(50) not null
);

create table subsidies(
id serial primary key not null,
id_account varchar(10) not null,
amount int not null,
description varchar(50),
is_active boolean,
id_subsidies_type int,
created_at timestamp not null default now(),
foreign key (id_account) references accounts(id),
foreign key (id_subsidies_type) references subsidies_types(id)
);



-----------------------------------------------------------------------------------------------------------------------
--insert_payment_method
delete from payments_methods;
insert into payments_methods  values(1,'Pago en Linea');
insert into payments_methods  values(2,'Efectivo');
insert into payments_methods  values(3,'Transferencia Bancaria');

--insert payment_type
delete from payments_types;
insert into payments_types  values (1,'Pago Total');
insert into payments_types  values (2,'Abono');

--insert_charge_types
delete from charges_types;
insert into charges_types  values (1,'Multa por Ausencia Reunión');
insert into charges_types  values (2,'Materiales');
insert into charges_types  values (3,'Incidentes');

--insert_payments
delete from payments;
insert into payments (id,amount,id_payment_method,id_payment_type) values (1,2000,1,1);
insert into payments (id,amount,id_payment_method,id_payment_type) values (2,10000,2,2);
insert into payments (id,amount,id_payment_method,id_payment_type) values (3,10000,2,2);
insert into payments (id,amount,id_payment_method,id_payment_type) values (4,3000,3,2);

--insert_meters
delete from meters;
insert into meters (id, name,barcode) values('42260-16','Medidor 34hp', '000125465421');
insert into meters (id, name,barcode) values('42240-12','Medidor 30hp', '000662356621');
insert into meters (id, name,barcode) values('42260-14','Medidor 30hp', '000122312421');

--insert_readings
delete from readings;
insert into readings (id, id_previous,value,id_meter,created_at) values(1,0,50,'42260-16',to_date('20190131','YYYYMMDD'));
insert into readings (id, id_previous,value,id_meter,created_at) values(2,1,100,'42260-16',to_date('20190228','YYYYMMDD'));
insert into readings (id, id_previous,value,id_meter,created_at) values(3,2,200,'42260-16',to_date('20190331','YYYYMMDD'));
insert into readings (id, id_previous,value,id_meter,created_at) values(4,0,100,'42240-12',to_date('20190101','YYYYMMDD'));

--insert_billing_period
delete from billing_period;
insert into billing_period (id, since_date, until_date, is_active) values (to_date('201812','YYYYMM'), current_date, current_date + interval '30 days', true);
insert into billing_period (id, since_date, until_date, is_active) values (to_date('201901','YYYYMM'), current_date - interval '30 days', current_date, false);

--insert_Organization
delete from organizations;
insert into organizations (id,type,name,line_of_business,street_name,house_number,sector,id_commune) values ('75148008','Comite de Agua Potable Rural','La Platina el Porvenir Santa Maria','Captacion, Purificacion, y Distribucion de Agua','La Platina','s/n','Peor es nada',158);


--insert_account
delete from accounts;
insert into accounts (id, street_name, house_number,sector,id_commune,id_meter,id_organization) values('PLC-0385','Puente la Cabra','s/n','Peor es Nada',158,'42260-16','75148008');
insert into accounts (id, street_name, house_number,sector,id_commune,id_meter,id_organization) values('PLC-0382','Puente la Cabra','s/n','Peor es Nada',158,'42260-16','75148008');
insert into accounts (id, street_name, house_number,sector,id_commune,id_meter,id_organization) values('PLC-0386','Puente la Cabra','s/n','Peor es Nada',158,'42260-16','75148008');

--insert_statements
delete from statements;
insert into statements values (1,to_date('201812','YYYYMM'),'PLC-0385',4,'32395',2000,'not-paid',now(),now() + interval '15 days');
insert into statements values (2,to_date('201812','YYYYMM'),'PLC-0382',2,'32397',44000,'not-paid',now(),now() + interval '15 days');
insert into statements values (3,to_date('201901','YYYYMM'),'PLC-0386',3,'32393',5000,'paid',now() - interval '15 days',now());


--insert_client
delete from users;
insert into users values ('16090139K',1,'121456789','Paula','Caceres','Rojas','F','paula.caceres.r@gmail.com','972127112');
insert into users values ('164924394',2,'987456156','Miguel','Becerra','Gonzalez','M','miguelbecerra01@gmail.com','934324048');

 
--insert_charges
delete from charges;
insert into charges values(1,5000,'Materiales',2);
insert into charges values(2,500,'No asistencia Reunion dia 23-12-2012',1);
insert into charges values(3,1000,'Cañeria 1/2 6mt por explosion',2);

--insert_statements_charges
delete from statements_charges;
insert into statements_charges values(1,2);
insert into statements_charges values(1,1);
insert into statements_charges values(2,3);

--insert_payments_lists
delete from payments_list;
insert into payments_list values(1,1);
insert into payments_list values(2,2);
insert into payments_list values(2,3);
insert into payments_list values(2,1);

--insert_subsidies_types
delete from subsidies_types;
insert into subsidies_types values(1,'Adulto Mayor');
insert into subsidies_types values(2,'Miembro Comite');
insert into subsidies_types values(3,'Ayuda Comunitaria');
insert into subsidies_types values(4,'Subsidio Gobierno');

--insert_subsidies
delete from subsidies;
insert into subsidies values(1,'PLC-0382', 2000, 'Otorgada por el alcalde',true,1);
insert into subsidies values(2,'PLC-0385', 4000, 'Ganada en por premio',true,2);
insert into subsidies values(3,'PLC-0386', 4000, 'Quitada por muerte',false,4);

--insert_user_roles;
delete from user_roles;
insert into user_roles values(1,'Cliente');
insert into user_roles values(2,'Administrativo');
insert into user_roles values(3,'Operario');
insert into user_roles values(4,'Comite');
insert into user_roles values(5,'Super Usuario');

------------------------------------------------------------------------------------------------------------------------
--Queries
--Account by accountid
select * from accounts where id = 'PLC-0385';

--Statements by accountId
select * from statements s, accounts a where s.id_account=a.id and a.id = 'PLC-0385';

--payment list by statement
select p.amount, 
(select name from payments_methods pm where pm.id = p.id_payment_method),
(select name from payments_types pt where pt.id = p.id_payment_type),
p.created_at
from payments_list pl, 
payments p, 
statements s, 
accounts a 
where pl.id_statement = s.id 
and pl.id_payment = p.id 
and s.id_account = a.id 
and a.id = 'PLC-0382';
