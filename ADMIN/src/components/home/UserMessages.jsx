import { Card } from 'primereact/card';
import React from 'react';

const UserMessages = () => {
    const messages = [
        {
        id: 'MSG001',
        name: 'John Doe',
        email: 'john.doe@example.com',
        message: 'Tôi cần hỗ trợ về đơn hàng #ORD001.',
        timestamp: '2025-03-31 10:30',
        },
        {
        id: 'MSG002',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        message: 'Có vấn đề với thanh toán online.',
        timestamp: '2025-03-31 09:15',
        },
        {
        id: 'MSG003',
        name: 'Bob Johnson',
        email: 'bob.j@example.com',
        message: 'Khi nào hàng được giao?',
        timestamp: '2025-03-31 08:45',
        }, 
    ];

    return (
        <Card
        className="shadow-md rounded-lg bg-white"
        style={{ maxHeight: '273px', overflowY: 'auto' }} // Giới hạn chiều cao và bật scroll
        >
        <h1 className='text-center font-bold text-black text-2xl'>Tin nhắn người dùng</h1>

        <div className="p-4">
            {messages.length === 0 ? (
            <p className="text-gray-600 text-center">Hiện chưa có tin nhắn nào.</p>
            ) : (
            <ul className="list-none">
                {messages.map((msg) => (
                <li
                    key={msg.id}
                    className="py-3 px-3 border-b last:border-b-0 hover:bg-gray-100 transition-colors rounded-md"
                >
                    <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                        <p className="font-semibold text-indigo-600">
                        {msg.name}{' '}
                        <span className="text-gray-500 font-normal">({msg.email})</span>
                        </p>
                        <p className="text-gray-700 mt-1">{msg.message}</p>
                    </div>
                    <p className="text-sm text-gray-500 whitespace-nowrap">{msg.timestamp}</p>
                    </div>
                </li>
                ))}
            </ul>
            )}
        </div>
        </Card>
    );
};

export default UserMessages;
