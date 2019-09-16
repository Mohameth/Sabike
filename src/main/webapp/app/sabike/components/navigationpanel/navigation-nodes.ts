export const sabike_paths = [
  {
    name: 'Bikes',
    type: 'folder',
    children: [
      { name: 'Mountain', type: 'mountain' },
      { name: 'Road', type: 'road' },
      { name: 'City', type: 'city' },
      { name: 'EBike', type: 'ebike' },
      { name: 'BMX', type: 'bmx' }
    ]
  },
  {
    name: 'Parts',
    type: 'folder',
    children: [
      {
        name: 'Steering',
        type: 'folder',
        children: [{ name: 'Stems', type: 'stems' }, { name: 'Handlebars', type: 'handlebars' }, { name: 'Headset', type: 'headset' }]
      },
      {
        name: 'Saddle / Seatpost',
        type: 'folder',
        children: [
          { name: 'Saddle', type: 'saddle' },
          { name: 'Seat posts', type: 'seat-posts' },
          { name: 'Seat clamps', type: 'seat-clamps' }
        ]
      },
      {
        name: 'Drivetrain',
        type: 'folder',
        children: [
          { name: 'Derailleur cable', type: 'derailleur' },
          { name: 'Chains', type: 'chains' },
          { name: 'Cranksets', type: 'cranksets' },
          { name: 'Pedals', type: 'pedals' },
          { name: 'Straps', type: 'straps' }
        ]
      },
      {
        name: 'Wheels / Tyres',
        type: 'folder',
        children: [
          { name: 'Tyres', type: 'tyres' },
          { name: 'Alloy and carbon wheels', type: 'alloy-carbon-wheels' },
          { name: 'Wire-spoked wheels', type: 'wire-spoked-wheels' },
          { name: 'Boyaux', type: 'boyaux' }
        ]
      },
      {
        name: 'Brakes',
        type: 'folder',
        children: [
          { name: 'Brake levers', type: 'brake-levers' },
          { name: 'Brake cables', type: 'brake-cables' },
          { name: 'Brake calipers', type: 'brake-calipers' },
          { name: 'Brake pads', type: 'brake-pads' }
        ]
      },
      {
        name: 'Frames / Forks',
        type: 'folder',
        children: [{ name: 'Frame kits', type: 'frame-kits' }, { name: 'Frames', type: 'frames' }, { name: 'Forks', type: 'forks' }]
      }
    ]
  }
];
