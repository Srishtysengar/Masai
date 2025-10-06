import {Server} from "socket.io";

export const initSocket = (httpServer)=>{
    const io =new Server(httpServer,{
        cors:{origin:process.env.CORS_ORIGIN}
    });

    io.on("connection", (socket)=>{
        console.log("User Connected", socket.id);

        socket.on("join-board",({boardId})=>{
            socket.join(`board:${boardId}`);
            console.log(`User joined board ${boardId}`);
        });

        socket.on("leave-board",({boardId})=>{
            socket.join(`board:${boardId}`);
            console.log(`User left board ${boardId}`);
        });

        socket.on("disconnect", ()=>{
        console.log("User Disconnected", socket.id);
    });
});

const notifyBoard=(boardId,event,payload)=>{
    io.to(`board:${boardId}`).emit(event,payload);
}
return{io,notifyBoard};
}