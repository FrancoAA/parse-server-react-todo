import Parse from 'parse';

const ParseLiveQueryHOC = (C, { applicationId, serverURL, masterKey, subscriptionQuery }) => {

  Parse.initialize(applicationId, masterKey);
  Parse.serverURL = serverURL;

  const client = new Parse.LiveQueryClient({
    applicationId,
    serverURL: 'ws://127.0.0.1:1337/parse', 
    masterKey
  });

  client.open();

  return class extends Component {
    state = {
      data: []
    };

    async componentDidMount() {
      // Set the initial data
      const parseData = await subscriptionQuery.find();
      const nativeData = parseData.map(d => d.toJSON());
      this.setState({ data: nativeData });
      
      // Subscribe to the events
      let subscription = client.subscribe(subscriptionQuery);

      subscription.on('create', (parseObj) => {
        const nativeObj = parseObj.toJSON();
        this.setState(prevState => ({
          data: [...prevState.data, nativeObj]
        }));
      });

      subscription.on('delete', (parseObj) => {
        const nativeObj = parseObj.toJSON();
        this.setState(prevState => {
          const data = prevState.data.filter(x => x.objectId !== nativeObj.objectId);
          return { data };
        });
      });

      subscription.on('update', (parseObj) => {
        const nativeObj = parseObj.toJSON();
        this.setState(prevState => {
          const pos = prevState.data.findIndex(x => x.objectId === nativeObj.objectId);
          prevState.data[pos] = nativeObj;
          return Object.assign({}, prevState);
        });
      });
    }

    componentWillUnmount() {
      client.disconnect();
    }

    render() {
      return <C data={this.state.data}/>
    }
  }
};

export default ParseLiveQueryHOC;