export const sabike_paths = [
  {
    name: 'Bikes',
    type: 'folder',
    route: '/articles/bikes',
    children: [
      { name: 'Mountain', type: 'mountain', route: '/articles/bikes/mountain' },
      { name: 'Road', type: 'road', route: '/articles/bikes/road' },
      { name: 'City', type: 'city', route: '/articles/bikes/city' },
      { name: 'EBike', type: 'ebike', route: '/articles/bikes/ebike' },
      { name: 'BMX', type: 'bmx', route: '/articles/bikes/bmx' }
    ]
  },
  {
    name: 'Parts',
    type: 'folder',
    route: '/articles/parts',
    children: [
      {
        name: 'Steering',
        type: 'folder',
        route: '/articles/parts/steering',
        children: [
          { name: 'Stems', type: 'stems', route: '/articles/parts/steering/stems' },
          { name: 'Handlebars', type: 'handlebars', route: '/articles/parts/steering/handlebars' },
          { name: 'Headset', type: 'headset', route: '/articles/parts/steering/headset' }
        ]
      },
      {
        name: 'Saddle / Seatpost',
        type: 'folder',
        route: '/articles/parts/saddle',
        children: [
          { name: 'Saddle', type: 'saddle', route: '/articles/parts/saddle/saddle' },
          { name: 'Seat posts', type: 'seat-post', route: '/articles/parts/saddle/seatpost' },
          { name: 'Seat clamps', type: 'seat-clamp', route: '/articles/parts/saddle/seatclamp' }
        ]
      },
      {
        name: 'Drivetrain',
        type: 'folder',
        route: '/articles/parts/drivetrain',
        children: [
          { name: 'Derailleur cable', type: 'derailleur', route: '/articles/parts/drivetrain/derailleur' },
          { name: 'Chains', type: 'chains', route: '/articles/parts/drivetrain/chains' },
          { name: 'Cranksets', type: 'cranksets', route: '/articles/parts/drivetrain/cranksets' },
          { name: 'Pedals', type: 'pedals', route: '/articles/parts/drivetrain/pedals' },
          { name: 'Straps', type: 'straps', route: '/articles/parts/drivetrain/straps' }
        ]
      },
      {
        name: 'Wheels / Tyres',
        type: 'folder',
        route: '/articles/parts/wheels',
        children: [
          { name: 'Tyres', type: 'tyres', route: '/articles/parts/wheels/tyres' },
          { name: 'Alloy and carbon wheels', type: 'alloy-carbon-wheels', route: '/articles/parts/wheels/alloy' },
          { name: 'Wire-spoked wheels', type: 'wire-spoked-wheels', route: '/articles/parts/wheels/wire' },
          { name: 'Boyaux', type: 'boyaux', route: '/articles/parts/wheels/boyaux' }
        ]
      },
      {
        name: 'Brakes',
        type: 'folder',
        route: '/articles/parts/brakes',
        children: [
          { name: 'Brake levers', type: 'brake-levers', route: '/articles/parts/brakes/levers' },
          { name: 'Brake cables', type: 'brake-cables', route: '/articles/parts/brakes/cables' },
          { name: 'Brake calipers', type: 'brake-calipers', route: '/articles/parts/brakes/calipers' },
          { name: 'Brake pads', type: 'brake-pads', route: '/articles/parts/brakes/pads' }
        ]
      },
      {
        name: 'Frames / Forks',
        type: 'folder',
        route: '/articles/parts/frames',
        children: [
          { name: 'Frame kits', type: 'frame-kits', route: '/articles/parts/frames/kits' },
          { name: 'Frames', type: 'frames', route: '/articles/parts/frames/frames' },
          { name: 'Forks', type: 'forks', route: '/articles/parts/frames/forks' }
        ]
      }
    ]
  }
];
