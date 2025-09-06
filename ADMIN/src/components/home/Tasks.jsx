import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import React, { useState } from 'react';

const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, description: 'Duyệt 3 đơn hàng mới', completed: false },
    { id: 2, description: 'Kiểm tra kho lúc 15:00', completed: false },
    { id: 3, description: 'Gửi báo cáo doanh thu', completed: false },
    { id: 4, description: 'Cập nhật thông tin sản phẩm', completed: false }, // Thêm để thử scroll
    { id: 5, description: 'Liên hệ nhà cung cấp', completed: false },
  ]);

  const onChange = (taskId, checked) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: checked } : task
      )
    );
  };

  return (
    <div className="grid">
      <Card
        className="shadow-md rounded-lg bg-white mb-5"
        style={{ maxHeight: '300px', overflowY: 'auto' }}
      >
        <h1 className='text-center font-bold text-black text-2xl'>Việc cần làm</h1>
        <ul className="list-none p-4 text-gray-700">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-3 py-2 px-3 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Checkbox
                inputId={`task-${task.id}`}
                checked={task.completed}
                onChange={(e) => onChange(task.id, e.checked ?? false)}
                className="text-indigo-600"
              />
              <label
                htmlFor={`task-${task.id}`}
                className={`flex-1 ${
                  task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                }`}
              >
                {task.description}
              </label>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default Tasks;
