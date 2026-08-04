export const seedCircles = [
  {
    id: "frontend-lab",
    name: "Frontend Lab",
    category: "Estudio",
    description: "Ideas, avances y decisiones del proyecto final.",
    emoji: "⌘",
    chats: [
      {
        id: "tp-final",
        name: "TP Final",
        description: "Entrega, componentes y últimas mejoras",
        messages: [
          { id: 1, author: "Mora", text: "Subí una idea nueva para la portada.", time: "12:18", mine: false },
          { id: 2, author: "Yo", text: "Buenísimo. Hoy termino el responsive y la revisamos.", time: "12:24", mine: true },
          { id: 3, author: "Nico", text: "Después probamos las rutas desde el celu.", time: "12:31", mine: false }
        ]
      },
      {
        id: "recursos",
        name: "Recursos",
        description: "Referencias y apuntes",
        messages: [{ id: 4, author: "Nico", text: "Dejé acá las referencias de React Router.", time: "10:42", mine: false }]
      }
    ]
  },
  {
    id: "pixel-club",
    name: "Pixel Club",
    category: "Gaming",
    description: "Partidas, clips y planes para el finde.",
    emoji: "◇",
    chats: [{
      id: "general",
      name: "General",
      description: "Lo que pinte",
      messages: [
        { id: 5, author: "Santi", text: "¿Sale algo hoy a la noche?", time: "18:04", mine: false },
        { id: 6, author: "Yo", text: "Después de estudiar me sumo.", time: "18:10", mine: true }
      ]
    }]
  },
  {
    id: "turno-noche",
    name: "Turno Noche",
    category: "Trabajo",
    description: "Pendientes y coordinación del equipo.",
    emoji: "✦",
    chats: [{
      id: "equipo",
      name: "Equipo",
      description: "Novedades del turno",
      messages: [{ id: 7, author: "Luz", text: "Quedó actualizado el listado para mañana.", time: "21:16", mine: false }]
    }]
  }
];
