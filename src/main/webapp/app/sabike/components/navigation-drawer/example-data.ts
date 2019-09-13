/** Example file/folder data. */
export const files = [
  {
    name: 'Vélos',
    type: 'folder',
    children: [
      { name: 'VTT', type: 'directions_bike' },
      { name: 'Route', type: 'directions_bike' },
      { name: 'Course', type: 'directions_bike' },
      { name: 'Ville', type: 'directions_bike' }
    ]
  },
  {
    name: 'Pièces',
    type: 'folder',
    children: [
      {
        name: 'Direction',
        type: 'folder',
        children: [
          { name: 'Potences', type: 'directions_bike' },
          { name: 'Guidons', type: 'directions_bike' },
          { name: 'Prolongateurs', type: 'directions_bike' },
          { name: 'Jeux de direction', type: 'directions_bike' },
          { name: 'Embouts de guidon', type: 'directions_bike' },
          { name: 'Rubans de guidon', type: 'directions_bike' },
          { name: 'Grips', type: 'directions_bike' }
        ]
      },
      {
        name: 'Transmission',
        type: 'folder',
        children: [
          { name: 'Câbles / Gaines', type: 'directions_bike' },
          { name: 'Chaînes', type: 'directions_bike' },
          { name: 'Pédaliers', type: 'directions_bike' },
          { name: 'Pédales', type: 'directions_bike' },
          { name: 'Straps / Cale pieds', type: 'directions_bike' },
          { name: 'Boîtier pédalier', type: 'directions_bike' },
          { name: 'Pignons / Roue libre', type: 'directions_bike' }
        ]
      },
      {
        name: 'Roues',
        type: 'folder',
        children: [
          { name: 'Pneus', type: 'directions_bike' },
          { name: 'Chambres à air', type: 'directions_bike' },
          { name: 'Fonds de jantes', type: 'directions_bike' },
          { name: 'Roues à rayons', type: 'directions_bike' },
          { name: 'Roues à bâtons', type: 'directions_bike' },
          { name: 'Jantes', type: 'directions_bike' },
          { name: 'Boyaux', type: 'directions_bike' }
        ]
      },
      {
        name: 'Freinage',
        type: 'folder',
        children: [
          { name: 'Leviers', type: 'directions_bike' },
          { name: 'Gaines', type: 'directions_bike' },
          { name: 'Câbles', type: 'directions_bike' },
          { name: 'Étriers', type: 'directions_bike' },
          { name: 'Patins', type: 'directions_bike' }
        ]
      },
      {
        name: 'Assise',
        type: 'folder',
        children: [
          { name: 'Selles', type: 'directions_bike' },
          { name: 'Tiges de selle', type: 'directions_bike' },
          { name: 'Colliers de selle', type: 'directions_bike' }
        ]
      }
    ]
  }
];
