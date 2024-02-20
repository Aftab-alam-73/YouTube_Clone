import { PrismaClient } from '@prisma/client';
const prisma =new PrismaClient()
const data=[
	{
		"id": 8,
		"description": "Hello",
		"createdAt": "2023-10-05T18:53:19.000Z",
		"userId": 7,
		"videoId": 2
	},
	{
		"id": 9,
		"description": "",
		"createdAt": "2023-10-05T18:54:21.000Z",
		"userId": 7,
		"videoId": 2
	},
	{
		"id": 10,
		"description": "good",
		"createdAt": "2023-10-05T18:56:26.000Z",
		"userId": 7,
		"videoId": 2
	},
	{
		"id": 11,
		"description": "",
		"createdAt": "2023-10-05T18:59:23.000Z",
		"userId": 7,
		"videoId": 2
	},
	{
		"id": 12,
		"description": "nice video man",
		"createdAt": "2023-10-05T19:00:34.000Z",
		"userId": 7,
		"videoId": 2
	},
	{
		"id": 14,
		"description": "Very good video",
		"createdAt": "2023-10-07T11:17:11.000Z",
		"userId": 7,
		"videoId": 4
	},
	{
		"id": 16,
		"description": "How are you doing bro",
		"createdAt": "2023-10-07T11:45:05.000Z",
		"userId": 6,
		"videoId": 4
	},
	{
		"id": 18,
		"description": "wow",
		"createdAt": "2023-10-14T10:00:48.000Z",
		"userId": 6,
		"videoId": 11
	},
	{
		"id": 20,
		"description": "Commenting....",
		"createdAt": "2023-10-23T17:08:06.000Z",
		"userId": 4,
		"videoId": 12
	},
	{
		"id": 21,
		"description": "Hello",
		"createdAt": "2023-10-24T06:25:07.000Z",
		"userId": 8,
		"videoId": 6
	},
	{
		"id": 22,
		"description": "beautiful ",
		"createdAt": "2023-10-24T06:26:31.000Z",
		"userId": 8,
		"videoId": 6
	},
	{
		"id": 27,
		"description": "dddddddddd",
		"createdAt": "2023-10-25T10:57:13.000Z",
		"userId": 10,
		"videoId": 20
	},
	{
		"id": 29,
		"description": "fdsfsd",
		"createdAt": "2024-01-11T05:48:40.000Z",
		"userId": 4,
		"videoId": 2
	}
]
async function main(){
  const newUsers=await prisma.comments.createMany({data:data})
  return newUsers;
}

main().then(res=>console.log(res)).catch(err=>console.log(err.message)).finally(prisma.$disconnect())