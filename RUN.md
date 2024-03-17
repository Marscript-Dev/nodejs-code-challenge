# Run project
```
docker compose up -d # run project
docker exec -it app sh -c "pnpm prisma db push" #run on completion of mysql container configuration
```
# Docker Container
* app
* mysql
* adminer

## App

The application is running on port 3000, rename .env.example to .env to make it work correctly.

### Endpoints

| URL | Protected | Body  Or Param|
| --- | ----------- | --- |
| http://localhost:3000/api/auth/login | **false** | `{ "Email": "example@email.com", "Password": "123456" }`|
| http://localhost:3000/api/users/register | **false** | `{"Name":"John Doe","Email":"example@email.com" , "Password":"123456"} `|
| http://localhost:3000/api/pokemons | **true** |  |
| http://localhost:3000/api/pokemons/add/:param | **true** | `25` or `pikachu`  |
| http://localhost:3000/api/pokemons/favorites/add/:param | **true** | `25` or `pikachu` |

## Mysql
when the mysql image is generated it creates the database named base_datos_prueba and the password is in the .env file in the variable MYSQL_ROOT_PASSWORD
## Adminer

The adminer is database management, run in port 8080