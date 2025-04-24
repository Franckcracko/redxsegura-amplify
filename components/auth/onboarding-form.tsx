'use client';

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests

export const Form = () => {
  const [tools, setTools] = useState<{ name: string; serie: number; }[]>([])
  const [toolBox, setToolBox] = useState<{ name: string; serie: number; } | null>()
  useEffect(() => {
    const getTodos = async () => {
      const { data: todos } = await client.models.Todo.list()
      console.log(todos)
    }
    getTodos()
  }, [])

  return (
    <form>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="sectorEconomyActivity">Selecciona tu sector de actividad económica</Label>
          <Select name="sectorEconomyActivity">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Actividad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="informal">Comercio Informal</SelectItem>
              <SelectItem value="office">Oficio</SelectItem>
              <SelectItem value="freelancer">Freelancer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="incomeMethod">Selecciona el como recibes tus ingresos</Label>
          <Select name="incomeMethod">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Metodo de ingresos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="informal">Tarjeta</SelectItem>
              <SelectItem value="office">Efectivo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="economyActivity">Actividad económica</Label>
          <Input
            id="economyActivity"
            type="text"
            placeholder="elotero"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="income">Cantidad de ingresos</Label>
          <Input
            id="income"
            type="number"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="incomeSources">Numero de fuentes de ingresos</Label>
          <Input
            id="incomeSources"
            type="text"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="regularCustomers">Numero de clientes fijos</Label>
          <Input
            id="regularCustomers"
            type="text"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="depending">Numero de personas que dependan de ti</Label>
          <Input
            id="depending"
            type="number"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="income">Tiempo desempeñando la actividad</Label>
          <Input
            id="income"
            type="text"
            placeholder="2 años"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="workFrequency">Selecciona la frecuencia de trabajo</Label>
          <Select name="workFrequency">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Frecuencias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Diaria</SelectItem>
              <SelectItem value="weekly">Semanal</SelectItem>
              <SelectItem value="eventually">Eventual</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="toolsBox">Herramientas de trabajo</Label>
          <AlertDialog>
            <AlertDialogTrigger>Open</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Agrega tu herramienta de trabajo</AlertDialogTitle>
              </AlertDialogHeader>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="description-tool">Descripción</Label>
                  <Input
                    id="description-tool"
                    type="text"
                    placeholder="pala"
                    onChange={(e) => setToolBox({ ...toolBox!, name: e.target.value })}
                    value={toolBox?.name}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="id-tool">Numero de serie</Label>
                  <Input
                    id="id-tool"
                    type="text"
                    placeholder="11111"
                    onChange={(e) => setToolBox({ ...toolBox!, serie: Number(e.target.value) })}
                    value={toolBox?.serie}
                  />
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => {
                  if (!toolBox?.name || !toolBox?.serie) return
                  setTools([...tools, toolBox!])
                  setToolBox(null)
                }}>Agregar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </div>
        <Button className="w-full" color="primary" type="submit">
          Enviar
        </Button>
      </div>
    </form>
  )
}