
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
drop table if exists payments_order_info cascade;
drop table if exists payments_order_details cascade;
drop table if exists billing_period  cascade; --
drop table if exists organizations  cascade;--
drop table if exists users_accounts cascade;--
drop table if exists accounts  cascade;--
drop table if exists statements_charges cascade;
drop table if exists charges cascade;
drop table if exists charges_types cascade;--
drop table if exists subsidies_types cascade;
drop table if exists subsidies cascade;
drop table if exists user_roles cascade;
commit; 

create table billing_period(
	id date not null primary key,
	since_date date not null,
	until_date date not null,
	is_active boolean,
	created_at timestamp not null default now()	
); 
 
create table payments_types(
	id serial primary key,
	description varchar(30) not null
);

create table payments_methods(
	id serial primary key,
	description varchar(30) not null
);

create table payments_order_details(
	id serial not null primary key,
	provider_order int,
	date_payment varchar(50),
	media varchar(50),
	conversion_date varchar(50),
	conversion_rate decimal,
	amount decimal,
	fee decimal,
	balance decimal,
	transfer_date varchar(50),
	token_provider  varchar(100),
    created_at timestamp not null default now() 
);


create table payments_order_info(
	id serial primary key,
	id_payment_order_details int,
	provider_order int,	
	commerce_order varchar(50),
	request_date varchar(50),
	status int,
	subject varchar(50),
	currency varchar(10),
	amount decimal,
	payer varchar(50),
	optional varchar(100),
	pending_info varchar(100),	
	token_provider  varchar(100),
	 created_at timestamp not null default now(),
	foreign key (id_payment_order_details) references payments_order_details(id)
);

create table payments(
 id serial primary key,
 amount int not null,
 id_payment_method int not null,
 id_payment_type int not null,
 token_provider  varchar(100),
 provider_order int,
 id_payment_order_info int,
 created_at timestamp not null default now(),
 foreign key (id_payment_method) references payments_methods(id),
 foreign key (id_payment_type) references payments_types(id),
 foreign key (id_payment_order_info) references payments_order_info(id)
);

 
create table user_roles(
id serial not null primary key,
description varchar(30) not null
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
	description varchar(50),
	barcode varchar(50),
	created_at timestamp not null default now()
);

create table organizations(
id varchar(20) not null primary key,
type varchar(50),
description varchar(100) not null,
line_of_business varchar(50),
street_name varchar(50),
house_number varchar(10),
sector varchar(50),
id_commune int not null,
api_key varchar(100),
secret_key varchar(100),
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
 id_billing_period date,
 value int not null,
 id_meter varchar(10) not null,
 created_at timestamp not null default current_date,
 unique(id,id_previous),
 foreign key(id_meter) references meters(id),
 foreign key(id,id_previous) references readings(id,id_previous),
 foreign key(id_billing_period) references billing_period(id)
);


create table statements (
 id serial not null primary key,
 id_billing_period date not null,
 id_account varchar(10) not null,
 id_reading int not null,
 ticket_number varchar(10) not null,
 status varchar(10) not null,
 emission_date date not null,
 due_date date not null,
 is_active boolean not null,
 id_previous_statement int,
 created_at timestamp not null default now(),
 unique(id, id_billing_period),
 foreign key (id_billing_period) references billing_period(id),
 foreign key (id_reading) references readings(id),
 foreign key (id_account) references accounts(id),
 foreign key (id_previous_statement) references statements(id)
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
	description varchar(30) not null,
	 created_at timestamp not null default now()
);

create table charges(
 id serial primary key,
 amount int not null,
 description varchar(100),
 id_charge_type int not null,
 id_payment int,
 created_at timestamp not null default now(),
 foreign key (id_charge_type) references charges_types(id),
 foreign key (id_payment) references payments(id)
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
description varchar(50) not null
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

delete from payments_list ;
delete from payments; 
delete from payments_order_info;
delete from payments_order_details;
delete from payments_types; 
delete from payments_methods;
delete from statements_charges ;
delete from statements;  
delete from readings; 
delete from users_accounts ;
delete from subsidies; 
delete from accounts ;
delete from meters;  
delete from users ; 
delete from billing_period; 
delete from organizations ; 
delete from charges; 
delete from charges_types; 
delete from subsidies_types ;
delete from user_roles;
commit; 

--insert_payment_method
delete from payments_methods;
insert into payments_methods  values(1,'Pago en Linea');
insert into payments_methods  values(2,'Efectivo');
insert into payments_methods  values(3,'Transferencia Bancaria');

--insert payment_type
delete from payments_types;
insert into payments_types  values (1,'Pago Total');
insert into payments_types  values (2,'Abono');


--insert_user_roles;
delete from user_roles;
insert into user_roles values(1,'Cliente');
insert into user_roles values(2,'Administrativo');
insert into user_roles values(3,'Operario');
insert into user_roles values(4,'Comite');
insert into user_roles values(5,'Super Usuario');


delete from payments_order_details;
--select * from payments_order_details;
--select * from payments_order_details where provider_order=74695;
insert into payments_order_details (provider_order,token_provider) values (74694,'asdasdsadasd');
insert into payments_order_details (provider_order, date_payment,media,conversion_date,conversion_rate,amount,fee,balance,transfer_date,token_provider) values (74695,'2016-06-01', 'transbank','2016-12-12',3.5,5000,300,5300,'2016-06-01','222221');
insert into payments_order_details (provider_order, date_payment,media,conversion_date,conversion_rate,amount,fee,balance,transfer_date,token_provider) values (74696,'2016-06-01', 'transbank','2016-12-12',3.5,2000,100,2300,'2016-06-01','222222');
insert into payments_order_details (provider_order, date_payment,media,conversion_date,conversion_rate,amount,fee,balance,transfer_date,token_provider) values (74697,'2016-06-01', 'transbank','2016-12-12',3.5,2000,100,2300,'2016-06-01','222222');
insert into payments_order_details (provider_order, date_payment,media,conversion_date,conversion_rate,amount,fee,balance,transfer_date,token_provider) values (74698,'2016-06-01', 'transbank','2016-12-12',3.5,2000,100,2300,'2016-06-01','222222');
insert into payments_order_details (provider_order, date_payment,media,conversion_date,conversion_rate,amount,fee,balance,transfer_date,token_provider) values (74699,'2016-06-01', 'transbank','2016-12-12',3.5,2000,100,2300,'2016-06-01','222222');

delete from payments_order_info;
--select * from payments_order_info;
--insert into payments_order_info (id_payment_order_details,provider_order,commerce_order,token_provider) values(1,74695,'123123','222221');
insert into payments_order_info (id_payment_order_details,provider_order,commerce_order,request_date,status,subject,currency,amount,payer,optional,pending_info,token_provider) values (1,74694,'123123','2016-06-01',1,'pagado desde miguel','CLP',5000,'miguelbecerra01@gmail.com','optional','pendinginfo','111111');
insert into payments_order_info (id_payment_order_details,provider_order,commerce_order,request_date,status,subject,currency,amount,payer,optional,pending_info,token_provider) values (2,74695,'123123','2016-06-01',1,'pagado desde miguel','CLP',5000,'miguelbecerra01@gmail.com','optional','pendinginfo','222222');
insert into payments_order_info (id_payment_order_details,provider_order,commerce_order,request_date,status,subject,currency,amount,payer,optional,pending_info,token_provider)values (2,74696,'123123','2016-06-01',3,'pagado desde miguel','CLP',5000,'miguelbecerra01@gmail.com','optional','pendinginfo','333333');
insert into payments_order_info (id_payment_order_details,provider_order,commerce_order,request_date,status,subject,currency,amount,payer,optional,pending_info,token_provider)values (2,74697,'123123','2016-06-01',3,'pagado desde miguel','CLP',5000,'miguelbecerra01@gmail.com','optional','pendinginfo','444444');
insert into payments_order_info (id_payment_order_details,provider_order,commerce_order,request_date,status,subject,currency,amount,payer,optional,pending_info,token_provider) values (1,74698,'123123','2016-06-01',4,'pagado desde miguel','CLP',5000,'miguelbecerra01@gmail.com','optional','pendinginfo','155551');


--insert_payments
delete from payments;
--select * from payments;
insert into payments (amount,id_payment_method,id_payment_type,token_provider,provider_order,id_payment_order_info,created_at) values (2000,1,1,74694,'111111',1,current_date-interval '1 month');
insert into payments (amount,id_payment_method,id_payment_type,token_provider,provider_order,id_payment_order_info,created_at) values (10000,2,2,74695,'222222',2,current_date -interval '2 month');
insert into payments (amount,id_payment_method,id_payment_type,token_provider,provider_order,id_payment_order_info,created_at) values (10000,2,2,74696,'333333',3,current_date +interval '1 day');
insert into payments (amount,id_payment_method,id_payment_type,token_provider,provider_order,id_payment_order_info,created_at) values (3000,3,2,74697,'444444',4,now());
insert into payments (amount,id_payment_method,id_payment_type,token_provider,provider_order,id_payment_order_info,created_at) values (4000,1,1,74698,'555555',5,current_date - interval '30 days');

--insert_meters
delete from meters;
insert into meters (id, description,barcode) values('42260-16','Medidor 34hp', '000125465421');
insert into meters (id, description,barcode) values('42240-12','Medidor 30hp', '000662356621');
insert into meters (id, description,barcode) values('42260-14','Medidor 30hp', '000122312421');

--insert_billing_period
delete from billing_period;
insert into billing_period (id, since_date, until_date, is_active) values (to_date('201811','YYYYMM'), current_date, current_date + interval '30 days', false);
insert into billing_period (id, since_date, until_date, is_active) values (to_date('201812','YYYYMM'), current_date, current_date + interval '30 days', false);
insert into billing_period (id, since_date, until_date, is_active) values (to_date('201901','YYYYMM'), current_date - interval '30 days', current_date, false);
insert into billing_period (id, since_date, until_date, is_active) values (to_date('201902','YYYYMM'), current_date - interval '30 days', current_date, false);
insert into billing_period (id, since_date, until_date, is_active) values (to_date('201903','YYYYMM'), current_date - interval '30 days', current_date, true);


--insert_readings
delete from readings;
insert into readings (id, id_previous,id_billing_period,value,id_meter,created_at) values(1,0,to_date('201811','YYYYMM'),50,'42260-16',to_date('20181031','YYYYMMDD'));
insert into readings (id, id_previous,id_billing_period,value,id_meter,created_at) values(2,1,to_date('201812','YYYYMM'),100,'42260-16',to_date('20181128','YYYYMMDD'));
insert into readings (id, id_previous,id_billing_period,value,id_meter,created_at) values(3,2,to_date('201901','YYYYMM'),200,'42260-16',to_date('20181211','YYYYMMDD'));
insert into readings (id, id_previous,id_billing_period,value,id_meter,created_at) values(4,0,to_date('201811','YYYYMM'),100,'42240-12',to_date('20181001','YYYYMMDD'));
insert into readings (id, id_previous,id_billing_period,value,id_meter,created_at) values(5,0,to_date('201901','YYYYMM'),100,'42240-12',to_date('20181001','YYYYMMDD'));


--insert_Organization
delete from organizations;
insert into organizations (id,type,description,line_of_business,street_name,house_number,sector,id_commune) values ('75148008','Comite de Agua Potable Rural','La Platina el Porvenir Santa Maria','Captacion, Purificacion, y Distribucion de Agua','La Platina','s/n','Peor es nada',158);
 

--insert_account
delete from accounts;
insert into accounts (id, street_name, house_number,sector,id_commune,id_meter,id_organization) values('PLC-0385','Puente la Cabra','s/n','Peor es Nada',158,'42260-16','75148008');
insert into accounts (id, street_name, house_number,sector,id_commune,id_meter,id_organization) values('PLC-0382','Puente la Cabra','s/n','Peor es Nada',158,'42260-16','75148008');
insert into accounts (id, street_name, house_number,sector,id_commune,id_meter,id_organization) values('PLC-0386','Puente la Cabra','s/n','Peor es Nada',158,'42260-16','75148008');


--insert_client
delete from users;
insert into users values ('16090139K',1,'121456789','Paula','Caceres','Rojas','F','paula.caceres.r@gmail.com','972127112');
insert into users values ('164924394',2,'987456156','Miguel','Becerra','Gonzalez','M','miguelbecerra01@gmail.com','934324048');
insert into users values ('123123123',2,'987452326','Andre','Zamorra','Gonzalez','M','demo@gmail.com','934324023');


--insert_users_account
delete from users_accounts;
insert into users_accounts values('16090139K','PLC-0385');
insert into users_accounts values('164924394','PLC-0386');
insert into users_accounts values('123123123','PLC-0382');

--insert_statements
delete from statements;
insert into statements (id,id_billing_period,id_account,id_reading,ticket_number,status,emission_date,due_date,is_active,id_previous_statement,created_at)  values (1,to_date('201811','YYYYMM'),'PLC-0385',1,'32395','paid',now(),now() + interval '15 days', false,null,to_date('201811','YYYYMM'));
insert into statements (id,id_billing_period,id_account,id_reading,ticket_number,status,emission_date,due_date,is_active,id_previous_statement,created_at)  values (2,to_date('201812','YYYYMM'),'PLC-0385',2,'32395','not-paid',now(),now() + interval '15 days', true,1,to_date('201812','YYYYMM'));
insert into statements (id,id_billing_period,id_account,id_reading,ticket_number,status,emission_date,due_date,is_active,id_previous_statement,created_at)  values (3,to_date('201812','YYYYMM'),'PLC-0382',4,'32397','not-paid',now(),now() + interval '15 days',true,null,to_date('201812','YYYYMM'));
insert into statements (id,id_billing_period,id_account,id_reading,ticket_number,status,emission_date,due_date,is_active,id_previous_statement,created_at)  values (4,to_date('201901','YYYYMM'),'PLC-0386',5,'32393','paid',now() - interval '15 days',now(), true,null,to_date('201901','YYYYMM'));


--insert_payments_lists
delete from payments_list;

insert into payments_list values(1,1);
insert into payments_list values(2,2);
insert into payments_list values(2,3);
insert into payments_list values(3,4);
insert into payments_list values(4,5);
 
--insert_charge_types
delete from charges_types;
insert into charges_types  values (1,'Saldo Pendiente');
insert into charges_types  values (2,'Multa por Ausencia Reunión');
insert into charges_types  values (3,'Materiales');
insert into charges_types  values (4,'Incidentes');
insert into charges_types  values (5,'Consumo');

--insert_charges
delete from charges;
insert into charges (id,amount,description,id_charge_type) values(1,5000,'Materiales',3);
insert into charges (id,amount,description,id_charge_type) values(2,500,'No asistencia Reunion dia 23-12-2012',4);
insert into charges (id,amount,description,id_charge_type) values(3,1000,'Cañeria 1/2 6mt por explosion',3);
insert into charges (id,amount,description,id_charge_type) values(4,5000,'Consumo Enero',1);
insert into charges (id,amount,description,id_charge_type) values(5,4000,'Saldo Pendiente Diciembre',2);
insert into charges (id,amount,description,id_charge_type) values(6,4000,'Consumo Diciembre',2);
insert into charges (id,amount,description,id_charge_type) values(7,2000,'Consumo Enero',1);
insert into charges (id,amount,description,id_charge_type) values(8,44000,'Consumo Enero',1);

--insert_statements_charges
delete from statements_charges;
insert into statements_charges values(1,6);
insert into statements_charges values(2,4);
insert into statements_charges values(2,5);
insert into statements_charges values(3,7);
insert into statements_charges values(4,8);



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
commit;


