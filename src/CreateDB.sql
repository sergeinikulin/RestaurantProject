CREATE DATABASE RestaurantSpring

CREATE USER SergeiNikulin WITH password '88215170360';
CREATE DATABASE "RestaurantSpring"
  WITH OWNER = "SergeiNikulin"
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'en_US.UTF-8'
       LC_CTYPE = 'en_US.UTF-8'
       CONNECTION LIMIT = -1;
GRANT ALL ON DATABASE "RestaurantSpring" TO "SergeiNikulin";
CREATE SCHEMA restaurant;

/* полное наполнение БАЗЫ ДАННЫХ */
    DROP TABLE IF EXISTS restaurant.compiler CASCADE;
    DROP SEQUENCE IF EXISTS restaurant.compiler_sequence CASCADE;
    DROP TABLE IF EXISTS restaurant.officiant CASCADE;
    DROP SEQUENCE IF EXISTS restaurant.officiant_sequence CASCADE;
    DROP TABLE IF EXISTS restaurant.executor CASCADE;
    DROP SEQUENCE IF EXISTS restaurant.executor_sequence CASCADE;
    DROP TABLE IF EXISTS restaurant.shipments CASCADE;
    DROP SEQUENCE IF EXISTS restaurant.shipment_sequence CASCADE;
    DROP TABLE IF EXISTS restaurant.supplier_shipment CASCADE;
    DROP SEQUENCE IF EXISTS restaurant.supplier_shipment_sequence CASCADE;
    DROP TABLE IF EXISTS restaurant.product CASCADE;
    DROP SEQUENCE IF EXISTS restaurant.product_sequence CASCADE;
    DROP TABLE IF EXISTS restaurant.dish CASCADE;
    DROP SEQUENCE IF EXISTS restaurant.dish_sequence CASCADE;
    DROP SEQUENCE IF EXISTS restaurant.order_sequence CASCADE;
    DROP TABLE IF EXISTS restaurant.orderTable CASCADE;
    DROP SEQUENCE IF EXISTS restaurant.orderTable_sequence CASCADE;

/* Cоставитель заказа, по сути официанты */
    CREATE SEQUENCE restaurant.officiant_sequence;
    CREATE TABLE restaurant.officiant(
        /* первичный ключ */    id_officiant INTEGER PRIMARY KEY DEFAULT NEXTVAL('restaurant.officiant_sequence'),
        /* ФИО */               FIO_officiant CHAR(64)
    );
    INSERT INTO restaurant.officiant(FIO_officiant) 
    VALUES
    ('Иванов Иван Иваныч'),
    ('Ильин Илья Сергеевич'), 
    ('Путин Владимир Владимирович');  

/* Исполнитель заказа, младший повар/шеф-повар/повар-стажер */
    CREATE SEQUENCE restaurant.executor_sequence;
    CREATE TABLE restaurant.executor(
        /* первичный ключ */    id_executor INTEGER PRIMARY KEY DEFAULT NEXTVAL('restaurant.executor_sequence'),
        /* ФИО */               FIO_executor CHAR(64),
        /* должность */         jobRole CHAR(64)
    );
    INSERT INTO restaurant.executor(FIO_executor, jobRole) 
    VALUES
    ('Иванов Иван Иваныч', 'младший повар'),
    ('Ильин Илья Сергеевич', 'шеф-повар'), 
    ('Путин Владимир Владимирович', 'повар-стажер');

/* Партия */
    CREATE SEQUENCE restaurant.shipment_sequence;
    CREATE TABLE restaurant.shipments(
        /* код партии */      id_shipment INTEGER PRIMARY KEY DEFAULT NEXTVAL('restaurant.shipment_sequence'),    
        /* дата */            datetime_shipment CHAR(64),                                                         
        /* цена */            price_shipment INTEGER,                                                             
        /* количество */      count_product_shipment INTEGER,                                                     
        /* название партии */ name_shipment CHAR(64)                                                                
    ); 
    INSERT INTO restaurant.shipments (datetime_shipment, price_shipment, count_product_shipment, name_shipment) 
    VALUES
    ('11/12/2018', '100', '10', 'Колбасы'), 
    ('12/12/2018', '800', '12', 'Мясо'),   
    ('13/12/2018', '700', '5',  'Сыры'),   
    ('14/12/2018', '1000', '5', 'Шоколадные изделия'),   
    ('15/12/2018', '8000', '5', 'Овощи'), 
    ('15/12/2018', '1000', '5', 'Вина'),   
    ('16/12/2018', '2000', '5', 'Водка'),   
    ('17/12/2018', '2500', '5', 'Хлеб'),   
    ('17/12/2018', '2000', '5', 'Булочки');  

/* Поставщик партии */
    CREATE SEQUENCE restaurant.supplier_shipment_sequence;
    CREATE TABLE restaurant.supplier_shipment(
       /* первичный ключ */         id_supplier_shipment INTEGER PRIMARY KEY DEFAULT NEXTVAL('restaurant.supplier_shipment_sequence'),
       /* код поставщика */         id_provider INTEGER,  
       /* код партии */             id_shipment INTEGER REFERENCES restaurant.shipments(id_shipment),                                                  
       /* название поставщика */    provider_name CHAR(64)                                                   
       );  
    INSERT INTO restaurant.supplier_shipment(id_provider, id_shipment, provider_name) 
    VALUES
    ('0', '1', 'Мясокомбинат'),          
    ('0', '2', 'Мясокомбинат'),   
    ('1', '8', 'Кондитерская'),
    ('1', '9', 'Кондитерская'),
    ('1', '5', 'Кондитерская'),
    ('1', '4', 'Кондитерская'),
    ('2', '3', 'ООО Русзавод'),
    ('2', '6', 'ООО Русзавод'),
    ('2', '7', 'ООО Русзавод');  

/* Продукт */
/* продукт не должен знать в каком блюде он находится */
    CREATE SEQUENCE restaurant.product_sequence;
    CREATE TABLE restaurant.product(
        /* первичный ключ */    id_product INTEGER PRIMARY KEY DEFAULT NEXTVAL('restaurant.product_sequence'),
        /* код партии */        id_shipment INTEGER REFERENCES restaurant.shipments(id_shipment),
        /* название продукта */ name_product CHAR(64),
        /* калорийность */      calorie CHAR(64)        
    );

    INSERT INTO restaurant.product (id_shipment, name_product, calorie) 
    VALUES
    ('1', 'колбаса докторская', '100'),  
    ('1', 'колбаса копченая', '100'),        
    ('5', 'картошка', '200'),   
    ('5', 'капуста', '300'),
    ('2', 'Мясо', '400'),
    ('2', 'Мясо2', '400'),
    ('1', 'Ветчина', '400'),
    ('3', 'сыр', '500'),
    ('2', 'соус', '600'),
    ('5', 'Свекла', '700'),
    ('5', 'Чеснок', '800'),
    ('2', 'Майонез', '100');

/* Блюдо */
    /* содержит записи всех продуктов, входящих в блюдо */
    CREATE SEQUENCE restaurant.dish_sequence;
    CREATE TABLE restaurant.dish(
        id_dish INTEGER PRIMARY KEY DEFAULT NEXTVAL('restaurant.dish_sequence'),
        name_dish CHAR(64),
        calorie  CHAR(64),
        price INTEGER,
        product INTEGER REFERENCES restaurant.product(id_product),
        order_id INTEGER
        /* order_id - 0 если нет в заказе */
    );

    /* имя блюда уникально должно быть */
    /* при покупке добавлять и заменять order_id */
    INSERT INTO restaurant.dish (name_dish, calorie, price, product, order_id) 
    VALUES 
    ('Борщ', '1000', '120', '1', '0'),
    ('Борщ', '1000', '120', '3', '0'),
    ('Борщ', '1000', '120', '4', '0'),
    ('Рагу', '1000', '120', '5', '0'),
    ('Рагу', '1000', '120', '3', '0'),
    ('Рагу', '1000', '120', '4', '0'),
    ('Рагу', '1000', '120', '9', '0'),
    ('Свекла', '1000', '120', '10', '0'),
    ('Свекла', '1000', '120', '11', '0'),
    ('Свекла', '1000', '120', '12', '0');


/* Заказ блюда */
    /* содержит записи блюд, идишник заказа не уникальный*/
    CREATE SEQUENCE restaurant.order_sequence;
      CREATE TABLE restaurant.orderTable(
        /* первичный ключ */    id_orderTable INTEGER PRIMARY KEY DEFAULT NEXTVAL('restaurant.order_sequence'),
        /* официант */          id_officiant CHAR(64),
        /* исполнитель */       id_executor CHAR(64),
        /* количество гостей */ count_guest INTEGER,
        /* цена заказа */       price_order INTEGER,
        /* время */             datetime_shipment CHAR(64),
        /* номер столика */     number_table INTEGER,
        /* блюда */             text_order_dishs CHAR(64)
    );
    INSERT INTO restaurant.orderTable(
            id_orderTable, 
            id_officiant, 
            id_executor,
            count_guest,
            price_order,
            datetime_shipment,
            number_table,
            text_order_dishs
    ) 
    VALUES
    ('0', '0', '0', '2', '150', '11-12-2012', '4', 'Борщ, Рагу, Свекла');
