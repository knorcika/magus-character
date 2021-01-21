import React from 'react';
import ReactSwipe from 'react-swipe';
// eslint-disable-next-line
import _ from 'lodash';
import './App.scss';
const localStorageKey = 'magic-characters';
const initValues = {
  characters: [
    // {
    //   name: '',
    //   strength: 0,
    //   agility: 0,
    //   stamina: 0,
    //   dexterity: 0,
    //   health: 0,
    //   beauty: 0,
    //   intelligence: 0,
    //   willpower: 0,
    //   astral: 0,
    //   detection: 0,
    //
    //   class: '',
    //   race: '',
    //   character: '',
    //   religion: '',
    //   homeland: '',
    //   school: '',
    //
    //   psi: {
    //     schoolType: '',
    //     degree: '',
    //     maxPsi: '',
    //     currentPsi: '',
    //   },
    //
    //   maxHp: 0,
    //   currentHp: 0,
    //   maxFp: 0,
    //   currentFp: 0,
    //   fpPerLevel: '',
    //
    //   educationPoint: 0,
    //   educations: [],
    //   weapons: [],
    //   mana: {},
    //
    //   wealth: {},
    //   magicResistance: {},
    //
    //   armor: {},
    //   shield: {},
    //
    //   equipments: [],
    // }
    {}
  ],
  characterIndex: 0,
  menuIndex: 0,
};

class App extends React.Component {
	constructor(props) {
		super(props);
		this.isLocalStorageSupported =
			localStorage && typeof localStorage.setItem === 'function' && typeof localStorage.getItem === 'function';
		this.state = Object.assign({}, initValues);

    if (this.isLocalStorageSupported) {
      const values = localStorage.getItem(localStorageKey);
      if (values) {
        this.state = Object.assign({}, initValues, JSON.parse(values));
      }
    }
	}

	storeStates() {
    if (this.isLocalStorageSupported) {
      localStorage.setItem(localStorageKey, JSON.stringify(this.state));
    }
	}

  resetValues() {
    this.setState(Object.assign({}, initValues), this.storeStates);
  }


  onChildUpdate(key, newState) {

    this.setState({ [key]: newState }, this.storeStates);
  }

  swipe = index => {
    this.setState({ menuIndex: index }, this.storeStates);
  }

  createCharacter() {
	  const characters = [...this.state.characters];
	  characters.push({name: 'New Character'});
    this.setState({ characters }, this.storeStates);
  }

  removeCharacter(key) {
    let characters = [...this.state.characters];
    characters.splice(key, 1);
    this.setState({ characters }, this.storeStates);
  }

  selectCharacter(key) {
    this.setState({ characterIndex: key }, this.storeStates);
  }

  setCharacterProperty(key, value) {
    let characters = [...this.state.characters];
    _.set(characters, `${this.state.characterIndex}.${key}`, value);
    this.setState({ characters }, this.storeStates);
  }

	render() {
    let reactSwipeEl;

    const swipeOptions = {
      startSlide: this.state.menuIndex || 0,
      disableScroll: false,
      continuous: false,
      draggable: true,
      transitionEnd: this.swipe,
    };

    const character = this.state.characters[this.state.characterIndex] || {};

		return (
      <div className={`container-lg app`}>
        <div className={'row'}>
          <div className={'col pl-0 pr-0 bg-white'}>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <div className={`nav-link ${this.state.menuIndex === 0 ? 'active' : ''}`} onClick={() => reactSwipeEl.slide(0, 300)}>
                  <i className={'bi bi-list-ul'}></i>
                </div>
              </li>
              <li className="nav-item">
                <div className={`nav-link ${this.state.menuIndex === 1 ? 'active' : ''}`} onClick={() => reactSwipeEl.slide(1, 300)}>
                  <i className={'bi bi-person-fill'}></i>
                </div>
              </li>
              <li className="nav-item">
                <div className={`nav-link ${this.state.menuIndex === 2 ? 'active' : ''}`} onClick={() => reactSwipeEl.slide(2, 300)}>
                  <i className={'bi bi-lightning-fill'}></i>
                </div>
              </li>
              <li className="nav-item">
                <div className={`nav-link ${this.state.menuIndex === 3 ? 'active' : ''}`} onClick={() => reactSwipeEl.slide(3, 300)}>
                  <i className={'bi bi-hexagon-fill'}></i>
                </div>
              </li>
              <li className="nav-item">
                <div className={`nav-link ${this.state.menuIndex === 4 ? 'active' : ''}`} onClick={() => reactSwipeEl.slide(4, 300)}>
                  <i className={'bi bi-bag-fill'}></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className={'row'}>
          <div className={'col p-0'}>
            <ReactSwipe
              className="carousel"
              swipeOptions={swipeOptions}
              ref={el => (reactSwipeEl = el)}
            >
              <div className={'panel'}>
                {Object.keys(this.state.characters).map(key => {
                  return (
                    <div className={'character d-flex justify-content-between'} key={key}>
                      <div className="align-self-start">
                        <p className={'m-0'}>{this.state.characters[key].name}</p>
                        <p className={'m-0 x-sm-font-size'}>
                          (Lvl. {this.state.characters[key].level || 1}) {this.state.characters[key].race} {this.state.characters[key].class}
                        </p>
                      </div>
                      <div className="align-self-end">
                        {key !== this.state.characterIndex &&
                          <button type="button" className={'btn btn-secondary'} onClick={() => this.selectCharacter(key)}>
                          <i className={'bi bi-check-circle-fill'}></i>
                        </button>}
                        <button type="button" className={'btn btn-secondary ml-1'} onClick={() => {
                          const isConfirmed = window.confirm('Are you sure you want to remove this character?');
                          if (isConfirmed) {
                            this.removeCharacter(key)
                          }
                        }}>
                          <i className={'bi bi-dash-circle-fill'}></i>
                        </button>
                      </div>
                    </div>
                  )
                })}
                <div>
                  <button type="button" className={'btn btn-secondary'} onClick={() => this.createCharacter()}>
                    <i className={'bi bi-plus-circle-fill'}></i> New Character
                  </button>
                </div>
              </div>
              <div className={'panel'}>
                <div className="separator">Tulajdonságok</div>

                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Erő</div>
                  <div className="align-self-end">
                    <input type="number" value={character.strength || ''} onChange={event => this.setCharacterProperty('strength', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Gyorsaság</div>
                  <div className="align-self-end">
                    <input type="number" value={character.agility || ''} onChange={event => this.setCharacterProperty('agility', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Állóképesség</div>
                  <div className="align-self-end">
                    <input type="number" value={character.stamina || ''} onChange={event => this.setCharacterProperty('stamina', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Ügyesség</div>
                  <div className="align-self-end">
                    <input type="number" value={character.dexterity || ''} onChange={event => this.setCharacterProperty('dexterity', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Egészség</div>
                  <div className="align-self-end">
                    <input type="number" value={character.health || ''} onChange={event => this.setCharacterProperty('health', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Szépség</div>
                  <div className="align-self-end">
                    <input type="number" value={character.beauty || ''} onChange={event => this.setCharacterProperty('beauty', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Inteligencia</div>
                  <div className="align-self-end">
                    <input type="number" value={character.intelligence || ''} onChange={event => this.setCharacterProperty('intelligence', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Akaraterő</div>
                  <div className="align-self-end">
                    <input type="number" value={character.willpower || ''} onChange={event => this.setCharacterProperty('willpower', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Asztrál</div>
                  <div className="align-self-end">
                    <input type="number" value={character.astral || ''} onChange={event => this.setCharacterProperty('astral', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Érzékelés</div>
                  <div className="align-self-end">
                    <input type="number" value={character.detection || ''} onChange={event => this.setCharacterProperty('detection', event.target.value)}/>
                  </div>
                </div>

                <div className="separator">Pszi &psi;</div>

                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Iskola típus</div>
                  <div className="align-self-end">
                    <input type="text" value={character.psiSchoolType || ''} onChange={event => this.setCharacterProperty('psiSchoolType', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Használat foka</div>
                  <div className="align-self-end">
                    <input type="text" value={character.psiLevel || ''} onChange={event => this.setCharacterProperty('psiLevel', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Aktuális &psi;</div>
                  <div className="align-self-end">
                    <input type="number" value={character.psiCurrent || ''} onChange={event => this.setCharacterProperty('psiCurrent', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Max &psi;</div>
                  <div className="align-self-end">
                    <input type="number" value={character.psiMax || ''} onChange={event => this.setCharacterProperty('psiMax', event.target.value)}/>
                  </div>
                </div>

                <div className="separator">Életerő</div>

                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Aktuális Ép.</div>
                  <div className="align-self-end">
                    <input type="number" value={character.currentHp || ''} onChange={event => this.setCharacterProperty('currentHp', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Max Ép.</div>
                  <div className="align-self-end">
                    <input type="number" value={character.maxHp || ''} onChange={event => this.setCharacterProperty('maxHp', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Aktuális Fp.</div>
                  <div className="align-self-end">
                    <input type="number" value={character.currentFp || ''} onChange={event => this.setCharacterProperty('currentFp', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Max Fp.</div>
                  <div className="align-self-end">
                    <input type="number" value={character.maxFp || ''} onChange={event => this.setCharacterProperty('maxFp', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Fp/szint</div>
                  <div className="align-self-end">
                    <input type="text" value={character.fpPerLevel || ''} onChange={event => this.setCharacterProperty('fpPerLevel', event.target.value)}/>
                  </div>
                </div>

                <div className="separator">Karakter</div>

                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Név</div>
                  <div className="align-self-end">
                    <input type="text" value={character.name || ''} onChange={event => this.setCharacterProperty('name', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Kaszt</div>
                  <div className="align-self-end">
                    <input type="text" value={character.class || ''} onChange={event => this.setCharacterProperty('class', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Faj</div>
                  <div className="align-self-end">
                    <input type="text" value={character.race || ''} onChange={event => this.setCharacterProperty('race', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Jellem</div>
                  <div className="align-self-end">
                    <input type="text" value={character.character || ''} onChange={event => this.setCharacterProperty('character', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Vallás</div>
                  <div className="align-self-end">
                    <input type="text" value={character.religion || ''} onChange={event => this.setCharacterProperty('religion', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Szülőföld</div>
                  <div className="align-self-end">
                    <input type="text" value={character.homeland || ''} onChange={event => this.setCharacterProperty('homeland', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Iskola</div>
                  <div className="align-self-end">
                    <input type="text" value={character.school || ''} onChange={event => this.setCharacterProperty('school', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Tapasztalat</div>
                  <div className="align-self-end">
                    <input type="number" value={character.experience || ''} onChange={event => this.setCharacterProperty('experience', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Szint</div>
                  <div className="align-self-end">
                    <input type="number" value={character.level || ''} onChange={event => this.setCharacterProperty('level', event.target.value)}/>
                  </div>
                </div>

                <div className="separator">Asztrál ellenállás</div>

                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Tudatalatti</div>
                  <div className="align-self-end">
                    <input type="number" value={character.astralResSubliminal || ''} onChange={event => this.setCharacterProperty('astralResSubliminal', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Stat. &psi; pajzs</div>
                  <div className="align-self-end">
                    <input type="number" value={character.astralResStatPsiArmor || ''} onChange={event => this.setCharacterProperty('astralResStatPsiArmor', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Din. &psi; pajzs</div>
                  <div className="align-self-end">
                    <input type="number" value={character.astralResDinPsiArmor || ''} onChange={event => this.setCharacterProperty('astralResDinPsiArmor', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Mágikus</div>
                  <div className="align-self-end">
                    <input type="number" value={character.astralResMagic || ''} onChange={event => this.setCharacterProperty('astralResMagic', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Összesen</div>
                  <div className="align-self-end">
                    {
                      (parseInt(character.astralResSubliminal) || 0) +
                      (parseInt(character.astralResStatPsiArmor) || 0) +
                      (parseInt(character.astralResDinPsiArmor) || 0) +
                      (parseInt(character.astralResMagic) || 0)
                    }
                  </div>
                </div>

                <div className="separator">Mentál ellenállás</div>

                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Tudatalatti</div>
                  <div className="align-self-end">
                    <input type="number" value={character.mentalResSubliminal || ''} onChange={event => this.setCharacterProperty('mentalResSubliminal', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Stat. &psi; pajzs</div>
                  <div className="align-self-end">
                    <input type="number" value={character.mentalResStatPsiArmor || ''} onChange={event => this.setCharacterProperty('mentalResStatPsiArmor', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Din. &psi; pajzs</div>
                  <div className="align-self-end">
                    <input type="number" value={character.mentalResDinPsiArmor || ''} onChange={event => this.setCharacterProperty('mentalResDinPsiArmor', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Mágikus</div>
                  <div className="align-self-end">
                    <input type="number" value={character.mentalResMagic || ''} onChange={event => this.setCharacterProperty('mentalResMagic', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Összesen</div>
                  <div className="align-self-end">
                    {
                      (parseInt(character.mentalResSubliminal) || 0) +
                      (parseInt(character.mentalResStatPsiArmor) || 0) +
                      (parseInt(character.mentalResDinPsiArmor) || 0) +
                      (parseInt(character.mentalResMagic) || 0)
                    }
                  </div>
                </div>

                <div className="separator">Vértezet</div>

                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Típus</div>
                  <div className="align-self-end">
                    <input type="text" value={character.armorType || ''} onChange={event => this.setCharacterProperty('armorType', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Anyaga</div>
                  <div className="align-self-end">
                    <input type="text" value={character.armorMaterial || ''} onChange={event => this.setCharacterProperty('armorMaterial', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">MGT</div>
                  <div className="align-self-end">
                    <input type="text" value={character.armorMGT || ''} onChange={event => this.setCharacterProperty('armorMGT', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Súlya</div>
                  <div className="align-self-end">
                    <input type="text" value={character.armorWeight || ''} onChange={event => this.setCharacterProperty('armorWeight', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Max SFÉ</div>
                  <div className="align-self-end">
                    <input type="text" value={character.armorMaxSFE || ''} onChange={event => this.setCharacterProperty('armorMaxSFE', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">STP</div>
                  <div className="align-self-end">
                    <input type="text" value={character.armorSTP || ''} onChange={event => this.setCharacterProperty('armorSTP', event.target.value)}/>
                  </div>
                </div>

                <div className="separator">Pajzs</div>

                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Típus</div>
                  <div className="align-self-end">
                    <input type="text" value={character.shieldType || ''} onChange={event => this.setCharacterProperty('shieldType', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Anyaga</div>
                  <div className="align-self-end">
                    <input type="text" value={character.shieldMaterial || ''} onChange={event => this.setCharacterProperty('shieldMaterial', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">MGT</div>
                  <div className="align-self-end">
                    <input type="text" value={character.shieldMGT || ''} onChange={event => this.setCharacterProperty('shieldMGT', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Súlya</div>
                  <div className="align-self-end">
                    <input type="text" value={character.shieldWeight || ''} onChange={event => this.setCharacterProperty('shieldWeight', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Védekező érték</div>
                  <div className="align-self-end">
                    <input type="number" value={character.shieldDefense || ''} onChange={event => this.setCharacterProperty('shieldDefense', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">STP</div>
                  <div className="align-self-end">
                    <input type="text" value={character.shieldSTP || ''} onChange={event => this.setCharacterProperty('shieldSTP', event.target.value)}/>
                  </div>
                </div>
                <div className={'d-flex justify-content-between'}>
                  <div className="align-self-start">Sebzés</div>
                  <div className="align-self-end">
                    <input type="text" value={character.shieldDamage || ''} onChange={event => this.setCharacterProperty('shieldDamage', event.target.value)}/>
                  </div>
                </div>
              </div>
              <div className={'panel'}>Fegyverek</div>
              <div className={'panel'}>Képzettség</div>
              <div className={'panel'}>Felszerelés</div>
            </ReactSwipe>
          </div>
        </div>
      </div>
		);
	}
}

export default App;
