module.exports = function (io) {
    const rooms = {};

    io.on("connection", (socket) => {
        socket.on("join room", (room) => {
            socket.join(room);
            rooms[room] = rooms[room] ? rooms[room] + 1 : 1;
            console.log(
                `User joined room: ${room}. Users in room: ${rooms[room]}`
            );

            if (rooms[room] === 1) {
                socket.emit("is teacher", true);
            } else {
                socket.emit("is teacher", false);
            }
        });

        socket.on("code change", (room, painting) => {
            socket.to(room).emit("code change", painting);
        });

        socket.on("leave room", (room) => {
            socket.leave(room);
            rooms[room]--;
            console.log(
                `User left room: ${room}. Users in room: ${rooms[room]}`
            );
        });

        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });
};
