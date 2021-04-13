import ColorPicker from '../ColorPicker';
import './App.scss';

const initialColors = [
  {
    label: 'Red',
    hexCode: '#ff0000',
  },
  {
    label: 'Yellow',
    hexCode: '#ffff00',
  },
  {
    label: 'Green',
    hexCode: '#008000',
  },
  {
    label: 'Blue',
    hexCode: '#0000ff',
  },
];

const App = () => {
  return (
    <div className="app-container">
      <ColorPicker
        value="#ff0000"
        onChange={() => {
          console.log('Color changed');
        }}
        colors={initialColors}
      />
    </div>
  );
};

export default App;
