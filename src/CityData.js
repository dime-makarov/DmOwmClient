function CityData({ data }) {
  return (
    <div id="cityData">
      <table cellSpacing="5">
        <tr>
          <th>Name</th>
          <td>{data?.name}</td>
        </tr>
        <tr>
          <th>Temp</th>
          <td>{data?.main?.temp}</td>
        </tr>
      </table>
    </div>
  );
}

export default CityData;
