export const sabike_paths = [
  {
    name: 'Bikes',
    type: 'folder',
    children: [
      { name: 'Mountain', type: 'node' },
      { name: 'Road', type: 'node' },
      { name: 'City', type: 'node' },
      { name: 'EBike', type: 'node' },
      { name: 'BMX', type: 'node' }
    ]
  },
  {
    name: 'Parts',
    type: 'folder',
    children: [
      {
        name: 'Steering',
        type: 'folder',
        children: [
          { name: 'Stems', type: 'node' },
          { name: 'Handlebars', type: 'node' },
          { name: 'Handlebar tape', type: 'node' },
          { name: 'Handlebar grip', type: 'node' },
          { name: 'Headset', type: 'node' },
          { name: 'Handlebar end plugs', type: 'node' },
          { name: 'Clip-on Aerobars', type: 'node' }
        ]
      },
      {
        name: 'Saddle / Seatpost',
        type: 'folder',
        children: [{ name: 'Saddle', type: 'node' }, { name: 'Seat posts', type: 'node' }, { name: 'Seat clamps', type: 'node' }]
      },
      {
        name: 'Drivetrain',
        type: 'folder',
        children: [
          { name: 'Derailleur cable', type: 'node' },
          { name: 'Chains', type: 'node' },
          { name: 'Cranksets', type: 'node' },
          { name: 'Pedals', type: 'node' },
          { name: 'Straps', type: 'node' },
          { name: 'Bottom brackets', type: 'node' },
          { name: 'Sprockets / Freewheels', type: 'node' },
          { name: 'Clipless pedals', type: 'node' }
        ]
      },
      {
        name: 'Wheels / Tyres',
        type: 'folder',
        children: [
          { name: 'Tyres', type: 'node' },
          { name: 'Inner tubes', type: 'node' },
          { name: 'Rim tapes', type: 'node' },
          { name: 'Alloy and carbon wheels', type: 'node' },
          { name: 'Wire-spoked wheels', type: 'node' },
          { name: 'Hub nuts', type: 'node' },
          { name: 'Disc wheels', type: 'node' },
          { name: 'Hubs', type: 'node' },
          { name: 'Rim', type: 'node' },
          { name: 'Boyaux', type: 'node' }
        ]
      },
      {
        name: 'Brakes',
        type: 'folder',
        children: [
          { name: 'Brake levers', type: 'node' },
          { name: 'Brake cables', type: 'node' },
          { name: 'Brake calipers', type: 'node' },
          { name: 'Brake pads', type: 'node' }
        ]
      },
      {
        name: 'Frames / Forks',
        type: 'folder',
        children: [{ name: 'Frame kits', type: 'node' }, { name: 'Frames', type: 'node' }, { name: 'Forks', type: 'node' }]
      }
    ]
  }
];
