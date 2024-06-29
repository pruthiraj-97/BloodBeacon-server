import { createClient } from 'redis';

const redisClient = createClient({
    password: 'D12mjOuXAfynmJn16mSq1Y3RBwl8P6wl',
    socket: {
        host: 'redis-10532.c90.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 10532
    }
});

redisClient.on('error',(error)=>{
    console.log("redis connection error",error)
})

redisClient.on('connect',()=>{
    console.log("redis connected")
})
redisClient.connect()
export default redisClient