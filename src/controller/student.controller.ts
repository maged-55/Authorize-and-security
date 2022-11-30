import { prisma } from '../../config/db';
import {Student } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';



import { NextFunction, Request, Response } from 'express';
import {
    studentSchemaType,
    studentSchema,
   
  } from '../zod_schema/school.Schema';

  
export const getStudentHandler = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
    try {
        const user = await prisma.student.findMany()
        return res.status(200).json(user);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Server Error" });
    }
};

export const addStudentHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const addStudent = req.body as Student ;
        await prisma.student.create({
            data: addStudent,
        });
       
        return res.status(201).json({ message: 'Student Added !' });

    } catch (error) {

        const prismaError = error as PrismaClientKnownRequestError;
        if (prismaError.code == 'P2002') {
          return res.status(400).json({
            message: 'Your Name have been used before',
          });
        }else{
        return res.status(500).json({
          message: 'Server Error !',
        });}
    }}


    export const getStudentByIdHandler = async (req: Request, res: Response) => {
        //:TODO Complete this endpoint
        const { studentid } = req.params ;
        const studentById = await prisma.student.findMany({
          where: {
            id: studentid,
          },
        });
      
        if (studentById.length == 0) {
          return res.status(400).json({
            message: "student is invalid",
          });
        }
      
        return res.status(200).json(studentById);
      };