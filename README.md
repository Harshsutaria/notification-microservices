
# notification-microservices

This repository is responsible for sending notifications via different channels like sms,email.

We have implemented 2 channels:- 

1 sms:- Using twilio package to send sms to the verified mobile numbers.
2.email:- We are using classic node mailer library for sending email to multiple users.
PS:- added wrong constants in .env file as we are using AWS-SDK(client id,secret) which can be mis-used easily. Will share correct constants seperately.


# Design:- 

a Implemented scalable microservice designed to efficiently queue notification sending jobs via AWS-SQS.

b.Upon queuing a job using SQS, we invoke an AWS Lambda function (a scalable compute service) tasked with asynchronously dispatching email and SMS notifications. This architecture ensures seamless scalability to accommodate varying workloads and growing demands.

c. As we are using serverless computing. Increasing queue throughput and scaling lambda to handle increased load would be a piece of cake.

![image](https://github.com/Harshsutaria/notification-microservices/assets/55646842/db3c8c44-d863-47ad-bde2-112a3d46d5e3)



# To run the microservice:-

1. npm i (to install dependencies)
2. npm run start (to run the server)

# output ss:- 

![image](https://github.com/Harshsutaria/notification-microservices/assets/55646842/1a0fee73-f44d-4efa-8b55-163a6d68bcbf)
![image](https://github.com/Harshsutaria/notification-microservices/assets/55646842/49241f5d-7f59-4fb2-aad2-b64fe45b44d7)
![image](https://github.com/Harshsutaria/notification-microservices/assets/55646842/106130df-1ad6-46a8-b45d-37284a23cd86)






