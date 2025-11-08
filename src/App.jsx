import { useState } from 'react'
import './App.css'
import PhotoCard from './components/PhotoCard'
import Home from './pages/Home'
import PortfolioGrid from './components/PortfolioGird'

import { Button } from "@/components/ui/button"


import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";


function App() {

  return (
    <>
      <div>
        <main className="p-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to my Portfolio</h1>
          <p className="text-gray-700">Here is some example content.</p>
        </main>
      </div>



      <div className="flex flex-col items-center justify-center">
        <Button>Click me</Button>
      </div>



      {/* 
      <Home /> */}

      <PortfolioGrid />
    </>
  )
}

export default App
