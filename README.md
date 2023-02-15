
<img src="./resources/images/car_logo.jpg" alt="Logo Image" height=20, width="20"/>


# vehicle-booking-system






## Tech Stack

**Client:** React, Angular

**Server:** Node, NestJS, Postgresql


## Run Locally

1. Clone the project

```bash
$ git clone https://<<username>>@bitbucket.org/debojyotichatterjee09/booking_system.git
```

2. Go to the project directory

```bash
$ cd client-booking-dispatch
```

3. Install dependencies using npm or yarn

```bash
$ yarn install
```
4. Update the DATABASE_URL in .env file

5. Check the DB connection using a client

6. Run migrations
```bash
$  yarn migrate:initial
```

Start the server

```bash
$  yarn start:dev
```


## Contributing

Points to follow while you add contributions:

Take a pull of the latest develop branch

```bash
$ git pull origin develop
```

Create a child branch based on [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) convention

```bash
$ git switch --create feature/<<FEATURE_NAME>>
```

OR

```bash
$ git switch --create bugfix/<<BUG_ID>>
```

Commit and push changes to your branch

```bash
$ git commit -m "<<YOUR_COMMIT_MESSAGE>>" .
$ git push origin <<BRANCH_NAME>>
```

Raise the PR to the parent branch to get the code merged.
## Migrations

To create a new schema or make changes in the schema

TBD later

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`

*TBD*

## Documentation

Please check the following links:

[NestJS](https://docs.nestjs.com/)

[TypeORM](https://typeorm.io)

