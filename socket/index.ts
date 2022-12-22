// import TcpSocket from "react-native-tcp-socket";

// const PORT = 80;
// const HOST = "192.168.4.1"; // 172.18.224.137

// export const TCP_SOCKET_OPTIONS: Parameters<typeof TcpSocket.connect>["0"] = {
//     port: PORT,
//     host: HOST,
//     localAddress: "127.0.0.1",
//     reuseAddress: true,
//     interface: "wifi",
//     localPort: 20000,
// };

// // Create socket
// export const getSocketClient = (
//     host?: string,
//     port?: number,
//     startText: string = "",
// ) => {
//     try {
//         // const socketClient = TcpSocket?.createConnection?.(
//         //     {
//         //         ...TCP_SOCKET_OPTIONS,
//         //         port: port ?? TCP_SOCKET_OPTIONS.port,
//         //         host: host ?? TCP_SOCKET_OPTIONS.host,
//         //     },
//         //     () => {
//         //         socketClient.write(startText);
//         //         socketClient.destroy();
//         //     },
//         // );
//         const socketClient = new TcpSocket.Socket();
//         // socketClient?.connect?.(
//         //     {
//         //         ...TCP_SOCKET_OPTIONS,
//         //         port: port ?? TCP_SOCKET_OPTIONS.port,
//         //         host: host ?? TCP_SOCKET_OPTIONS.host,
//         //     },
//         //     () => {
//         //         socketClient.write(startText);
//         //         socketClient.destroy();
//         //     },
//         // );
//         console.log("sc => ", socketClient._id);
//         return socketClient;
//     } catch (error) {
//         console.log("error in get socket client => ", error);
//         return null;
//     }
// };

// // export const socketClient = TcpSocket?.createConnection?.(options, () => {
// //     socketClient?.write?.("startText");
// // });

// // socketClient.on("data", (data) => {
// //     console.log("message was received", data);
// // });

// // socketClient.on("error", (error) => {
// //     console.log(error);
// // });

// // socketClient.on("close", () => {
// //     console.log("Connection closed!");
// // });

// // console.log("sc => ",socketClient._id);
