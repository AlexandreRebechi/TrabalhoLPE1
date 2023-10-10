CREATE TABLE pais (
	codigo serial not null primary key, 
   	nome varchar (40) not null
)
CREATE TABLE estados (
	codigo serial not null primary key, 
  	nome varchar (40) not null,
	uf varchar(2) not null,
	pais integer not null,
	foreign key(pais) references pais(codigo)
)
CREATE TABLE cidades (
	codigo serial not null primary key,
	nome varchar (40),
	estado integer,
	foreign key(estado) references estados(codigo)
)
create table usuarios (
	email varchar(50) not null primary key, 
	senha varchar(20) not null, 
	tipo char(1)  not null, 
	check (tipo = 'T' or tipo = 'A' or tipo = 'U'),
	telefone varchar(14)  not null, 
	nome varchar(50) not null
);


SELECT * FROM pais ORDER BY nome
SELECT * FROM estados ORDER BY nome