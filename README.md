# notification-microservices

This repository is responsible for sending notifications via different channels like sms,email.

We have implemented 2 channels:- 

1 sms:- Using twilio package to send sms to the verified mobile numbers.
2.email:- We are using classic node mailer library for sending email to multiple users.


Design:- 

a Implemented scalable microservice designed to efficiently queue notification sending jobs via AWS-SQS.

b.Upon queuing a job using SQS, we invoke an AWS Lambda function (a scalable compute service) tasked with asynchronously dispatching email and SMS notifications. This architecture ensures seamless scalability to accommodate varying workloads and growing demands.

c. As we are using serverless computing. Increasing queue throughput and scaling lambda to handle increased load would be a piece of cake.





