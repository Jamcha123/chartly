import './style.css'
import {ArcElement, BarController, BarElement, BubbleController, CategoryScale, Chart as ChartJS, LinearScale, LineController, LineElement, PieController, PointElement, PolarAreaController, RadialLinearScale, ScatterController} from 'chart.js'
import $ from 'jquery'
import C2S from 'canvas2svg'

ChartJS.register(BarElement, PolarAreaController, RadialLinearScale, ScatterController, BarController, LinearScale, LineController, LineElement, CategoryScale, PieController, ArcElement, PointElement, BubbleController)

const items = (type, colors, x_values, y_values) => {
  const ctx = document.getElementById("bg")
  new ChartJS(ctx, {
    type: type, 
    data: {
      labels: x_values,
      datasets: [{
        label: "example", 
        data: y_values, 
        backgroundColor: colors,
      }]
    },
    options: {
      animation: true, 
      responsive: true
    }
  })
}

const types = ["bar", "pie", "polarArea"]
let cols = []
let x_values = []
let y_values = []

types.forEach((e) => {
  const data = document.getElementById(e)
  data.addEventListener("click", (j) => {
    j.preventDefault()
    alert(e + " chart type chosen")
    $("#charts").empty()
    let x = document.createElement("canvas")
    x.setAttribute("id", "bg")
    x.style.width = 100 + "%"
    x.style.height = 50 + "%"
    x.value = e

    document.getElementById("charts").appendChild(x)
    window.localStorage.setItem("type", e)

    items(e, cols, x_values, y_values)
  })
})

let index = 0; 
document.getElementById("add").addEventListener("click", (e) => {
  e.preventDefault()

  let x = document.createElement("div")
  x.classList.add("elements")
  
  let valueX = document.createElement("input")
  valueX.type = "text"
  valueX.setAttribute("id", "x" + index.toString())
  valueX.classList.add("valuex")
  valueX.placeholder = "enter a X value"
  x.appendChild(valueX)

  let valueY = document.createElement("input")
  valueY.type = "number"
  valueY.setAttribute("id", "y" + index.toString())
  valueY.classList.add("valuey")
  valueY.placeholder = "enter a Y value"
  x.appendChild(valueY)

  let coltext = document.createElement("h1")
  coltext.classList.add("text")
  coltext.innerText = "enter a color: "
  x.appendChild(coltext)

  let color = document.createElement("input")
  color.type = "color"
  color.classList.add("color")
  color.setAttribute("id", "color" + index.toString())
  color.placeholder = "enter a color"
  x.appendChild(color)


  document.getElementById("form").appendChild(x)
  index += 1
})

const item1 = document.getElementsByClassName("valuex")
const item2 = document.getElementsByClassName("valuey")
const item3 = document.getElementsByClassName("color")

document.getElementById("element_form").addEventListener("submit", (e) => {
  e.preventDefault()
  let types = window.localStorage.getItem("type")
  if(types == null || types == undefined){
    alert("choose a chart type first")
    return 
  }
  x_values = []
  y_values = []
  cols = []
  for(let i = 0; i != item1.length; i++){
    x_values.push(document.getElementById(item1[i].id).value)
    y_values.push(document.getElementById(item2[i].id).value)
    cols.push(document.getElementById(item3[i].id).value)
  }  
  $("#charts").empty()

  let x = document.createElement("canvas")
  x.setAttribute("id", "bg")
  x.style.width = 100 + "%"
  x.style.height = 50 + "%"
  x.value = types

  document.getElementById("charts").appendChild(x)

  const width = document.getElementById("bg").clientWidth
  const height = document.getElementById("bg").clientHeight

  const charts = new ChartJS(document.getElementById("bg"), {
    type: types,
    data: {
      labels: x_values,
      datasets: [{
        label: "example", 
        data: y_values,
        backgroundColor: cols
      }]
    },
    options: {
      animation: false, 
      responsive: false
    }
  })
  
  $("#photo").empty()
  let photo = document.createElement("img")
  photo.src = charts.toBase64Image()
  photo.alt = ""
  document.getElementById("photo").appendChild(photo)

  let down = document.createElement("a")
  down.href = charts.toBase64Image()
  down.download = "/img.png"
  down.click()
})


