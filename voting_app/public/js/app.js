let ProductTemplate = function () {
  return (
    <div className='item'>
      <div className='image'>
        <img src={this.props.productImageUrl}/>
      </div>
      <div className='middle aligned content'>
        <div className='header'>
          <a onClick={this.handleUpVote}>
            <i className='large caret up icon'/>
          </a>
          {this.props.votes}
        </div>
        <div className='description'>
          <a href={this.props.url}>
            {this.props.title}
          </a>
          <p>
            {this.props.description}
          </p>
        </div>
        <div className='extra'>
          <span>Submitted by:</span>
          <img
            className='ui avatar image'
            src={this.props.submitterAvatarUrl}
          />
        </div>
      </div>
    </div>
  );
};


class Product extends React.Component {
/*  constructor(props) {
    super(props);

    this.handleUpVote = this.handleUpVote.bind(this);
  }*/

/*  handleUpVote() {
    // this es null en este metodo al ser llamado desde render()
    // en render el this hace referencia al componente pero este metodo tiene
    // su propio contexto
    this.props.onVote(this.props.id);
  }*/

  handleUpVote = () => this.props.onVote(this.props.id);

  render() {
    return ProductTemplate.call(this);
  }
}


function ejemplo(){
  let obj1 = {saludo: 'hola'};
  let obj2 = {despedida: 'adios'};

  // assign acepta cualquier numero de argumentos
  let obj3 = Object.assign({}, obj1, obj2);

  let obj4 = {despedida: 'hasta luego'};
  // las claves se asignan desde la derecha sobreescribiendo los de la izq
  let ojb5 = Object.assign({}, obj1, obj2, obj4);
  /*
    obj5 = {
      saludo: 'hola',
      despedida: 'hasta luego'
    }
  */
}

/*class ProductList extends React.Component {
  constructor(props) {
    // como este componente no recibe props, no sería necesario llamar a super
    // pero se trata de una buena practica y si en el futuro cambia este
    // componente nos evita quebraderos de cabeza buscando el error de pq no
    // recibe props
    super(props);

    this.state = {
      // una vez mas, se trata de una buena practica inicial los datos a vacio
      // y rellenarlos en componentDidMount por ejemplo
      // si se trata de datos asincronos no los tendremos de primeras por ejemplo
      products: [],
    };

    // como este metodo usa el this del componente, debemos bindearlo al contexto
    // del componente.
    this.handleProductUpVote = this.handleProductUpVote.bind(this);
  }

  componentDidMount() {
    this.setState({products: Seed.products});
  }

  handleProductUpVote(productId) {
    // con map creamos un nuevo array manteniendo this.state.products inmutable
    const nextProducts = this.state.products.map((product) => {
      if (product.id === productId) {
        // assign asigna propiedades de derecha a izq, lo que significa que la
        // clave votes del ultimo objeto sobreescribe si lo tuviera la clave votes
        // del objeto product
        return Object.assign({}, product, {
          votes: product.votes + 1,
        });
      } else {
        return product;
      }
    });
    this.setState({
      products: nextProducts,
    });
  }

  render() {
    // sort muta el array
    /!*
      1. If the return value is less than 0 , a should come first (have a lower
          index).
      2. If the return value is greater than 0 , b should come first.
      3. If the return value is equal to 0 , leave order of a and b unchanged
          with respect to each other.
     *!/
    const products = this.state.products.sort((a, b) => (b.votes - a.votes));

    const productComponents = products.map((product) => (
      <Product
        key={'product-' + product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onVote={this.handleProductUpVote}
      />
    ));
    return (
      <div className='ui unstackable items'>
        {productComponents}
      </div>
    );
  }
}*/

class ProductList extends React.Component {
  state = {
    products: []
  };

  handleProductUpVote = (productId) => {
    const nextProducts = this.state.products.map((product) => {
      if (product.id === productId) {
        return Object.assign({}, product, {
          votes: product.votes + 1,
        });
      } else {
        return product;
      }
    });
    this.setState({
      products: nextProducts,
    });
  };

  componentDidMount() {
    this.setState({products: Seed.products});
  }

  render() {
    const products = this.state.products.sort((a, b) => (b.votes - a.votes));

    const productComponents = products.map((product) => (
      <Product
        key={'product-' + product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onVote={this.handleProductUpVote}
      />
    ));
    return (
      <div className='ui unstackable items'>
        {productComponents}
      </div>
    );
  }
}

/*
// En este ejemplo se renderiza un sólo elemento del array Seed.products
class ProductList extends React.Component {
  render() {
    const product = Seed.products[0];
    return (
      <div className='ui unstackable items'>
        {/!*Vemos que aqui renderizamos otro componente*!/}
        <Product
          id={product.id}
          title={product.title}
          description={product.description}
          url={product.url}
          votes={product.votes}
          submitterAvatarUrl={product.submitterAvatarUrl}
          productImageUrl={product.productImageUrl}
        />
      </div>
    );
  }
}
*/

ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
);