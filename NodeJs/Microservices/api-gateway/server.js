
const gateway = require('fast-gateway');
const port = 9001;

const checkAuth =(req,res,next)=>{
    if(req.headers.token && req.header.token!=''){
        next();
    }else{
        res.setHeader('Content-type','application/json');
        res.statusCode=401;
        res.end(JSON.stringify({
            status:401,message:'Authentication Fail'
        }))
    }
   console.log(req.headers); 
   
}
const server=gateway({
    // middlewares:[checkAuth],
    routes:[
        {
            prefix:'/order',
            target: 'http://localhost:7001/',
            // middlewares:[checkAuth],
            hooks: {

            }

        },
        {
            prefix:'/payment',
            target: 'http://localhost:7002/',
            // middlewares:[checkAuth],
            methods:['Post'],
            hooks: {

            }

        }
    ]
})


server.get('/myTesting',(req,resp)=>resp.send('yes called gateway'));
server.start(port).then(server=>console.log("Api Gateway is Running at  9001"))
