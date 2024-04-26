import React, { useEffect, useState } from "react";

import {
  DocumentData,
  addDoc,
  doc,
  collection,
  onSnapshot,
  query,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "@/firebaseConfig";

function Dashboard() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<DocumentData[]>([]);
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const [editId, setEditId] = useState(null);

  const addDocCollectionref = collection(db, "Todos");

  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isEditing && editId !== null) {
        await updateDoc(doc(db, "Todos", editId), {
          Todo: todo,
        });
      } else {
        await addDoc(addDocCollectionref, {
          Todo: todo,
        });
      }

      setTodo("");
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const q = query(addDocCollectionref);
    const unsub = onSnapshot(q, (snapshot) => {
      const todosArray: DocumentData[] = [];
      snapshot.forEach((doc) => {
        const todoitem = { ...doc.data(), docId: doc.id };
        todosArray.push(todoitem);
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  const handleEdit = (todoData: DocumentData) => {
    setTodo(todoData.Todo);
    setIsEditing(true);
    setEditId(todoData.docId);
  };

  const handleDelete = async (todoData: DocumentData) => {
    deleteDoc(doc(db, "Todos", todoData.docId));
  };

  return (
    <div>
      Dashboard
      <form onSubmit={createUser}>
        <input
          type="text"
          placeholder="Enter a todo"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todoData, index) => {
          const todoText: string = todoData.Todo;
          return (
            <li key={index}>
              {todoText}
              <button onClick={() => handleEdit(todoData)}>Edit</button>
              <button onClick={() => handleDelete(todoData)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Dashboard;
