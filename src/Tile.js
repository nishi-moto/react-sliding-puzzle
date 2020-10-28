function Tile(props) {

  const tileOnClickHandler = () => {
    props.moveHandler(props.correctPosition);
  }

  if(props.currentPosition === null){
    return (
      <div className="TileNull" onClick={tileOnClickHandler}>
        <div className="TileContent"> {null}</div>
      </div>
    );
  } 
  return (
    <div className="Tile" onClick={tileOnClickHandler}>
      <div className="TileContent"> {props.currentPosition + 1}</div>
    </div>
  );
}

export default Tile;
