import express from 'express'
import { Server, createServer } from 'http'
import {Socket } from 'socket.io'
export const app=express()
const server=createServer(app)
export const io=new Server(server)
io.on('connection',(socket:Socket)=>{
    console.log('connected');
    socket.on('disconnect',()=>{
        console.log('disconnected');
    })
})