function Tile(props) {

  return (
    <div className="Tile">
      {props.correctPostition !== null ? props.correctPostition+1 : null}
    </div>
  );
}

export default Tile;
