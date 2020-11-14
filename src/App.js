import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { generatePalette } from './colorHelper';
import PaletteList from './PaletteList'
import Palette from './Palette';
import SingleColorPalette from './SingleColorPalette'
import seedColors from './seedColors';
import NewPaletteForm from './NewPaletteForm'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Page from './Page'


class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes")) // saved items in local storage
    this.state = { palettes: savedPalettes || seedColors }
    this.findPalette = this.findPalette.bind(this)
    this.deletePalette = this.deletePalette.bind(this)
  }
  findPalette(id) {
    return this.state.palettes.find(palette => { return palette.id === id })
  }
  deletePalette(id) {
    this.setState(currSt => ({ palettes: currSt.palettes.filter(p => p.id !== id) }),
      this.syncLocalStorage
    )
  }
  savePalette = newPalette => { //bc i am not using a constructor here
    this.setState({ palettes: [...this.state.palettes, newPalette] }, this.syncLocalStorage)
  }
  syncLocalStorage() {
    //save palettes to local storage
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes))
  }
  render() {
    return (
      <Route render={routeProps =>
        <TransitionGroup>
          <CSSTransition key={routeProps.location.key} classNames='page' timeout={500}>
            <Switch location={routeProps.location}>
              <Route exact path='/' render={routeProps =>
                <Page>
                  <PaletteList {...routeProps} palettes={this.state.palettes} deletePalette={this.deletePalette} />
                </Page>} />
              <Route exact path="/palette/new" render={routeProps =>
                <Page>
                  <NewPaletteForm
                    {...routeProps}
                    savePalette={this.savePalette} palettes={this.state.palettes} />
                </Page>}
              />
              {/* above route is important to come before the palette/id route cos"new will be taken as an id which will cause problems */}
              <Route exact path='/palette/:id'
                render={routeProps =>
                  <Page>
                    <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />
                  </Page>}
              />
              {/* <Palette palette={generatePalette(seedColors[4])} /> */}
              <Route exact path='/palette/:paletteId/:colorId'
                render={routeProps =>
                  <Page>
                    <SingleColorPalette
                      palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
                      colorId={routeProps.match.params.colorId} />
                  </Page>}
              />
              <Route render={routeProps =>
                <Page>
                  <PaletteList {...routeProps} palettes={this.state.palettes} deletePalette={this.deletePalette} />
                </Page>} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      }

      />
    )
  };
}

export default App;
