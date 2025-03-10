
"use client"

import type React from "react"

import { useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Todo {
  id: number
  text: string
  completed: boolean
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState("")

  // Add a new todo
  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim() === "") return

    const newTask: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    }

    setTodos([...todos, newTask])
    setNewTodo("")
  }

  // Delete a todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
    if (editingId === id) {
      setEditingId(null)
    }
  }

  // Start editing a todo
  const startEditing = (todo: Todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  // Save edited todo
  const saveEdit = () => {
    if (editText.trim() === "") return

    setTodos(todos.map((todo) => (todo.id === editingId ? { ...todo, text: editText } : todo)))
    setEditingId(null)
  }

  // Toggle todo completion status
  const toggleComplete = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle className="text-center">Todo List App</CardTitle>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        <form onSubmit={addTodo} className="flex gap-2">
          <Input
            type="text"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">Add</Button>
        </form>

        <div className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-center text-muted-foreground">No tasks yet. Add one above!</p>
          ) : (
            todos.map((todo) => (
              <div key={todo.id} className="flex items-center gap-2 p-2 border rounded-md">
                {editingId === todo.id ? (
                  <div className="flex flex-1 gap-2">
                    <Input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1"
                      autoFocus
                    />
                    <Button size="sm" onClick={saveEdit}>
                      Save
                    </Button>
                  </div>
                ) : (
                  <>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id)}
                      className="h-4 w-4"
                    />
                    <span
                      className={`flex-1 ${todo.completed ? "line-through text-muted-foreground" : ""}`}
                      onClick={() => toggleComplete(todo.id)}
                    >
                      {todo.text}
                    </span>
                    <Button variant="ghost" size="icon" onClick={() => startEditing(todo)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteTodo(todo.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>

      <CardFooter className="bg-muted/50 p-2 text-center text-xs text-muted-foreground">
        <p className="w-full">You have {todos.filter((t) => !t.completed).length} tasks remaining</p>
      </CardFooter>
    </Card>
  )
}
