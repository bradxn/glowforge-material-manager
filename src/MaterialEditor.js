import React from 'react';
import BitmapEngrave from './BitmapEngrave';
import Cut from './Cut';
import MaterialButtonBar from './MaterialButtonBar';
import Score from './Score';
import VectorEngrave from './VectorEngrave';
import {
  IconPlus,
} from './Icons';
import {
  STATE_ADD,
  STATE_EDIT,
} from './state';

class MaterialEditor extends React.Component {
  render() {

    const {
      action,
      material,
    } = this.props;

    if (action !== STATE_ADD && action !== STATE_EDIT) {
      return null;
    }

    return (
      <React.Fragment>
        <div className="App-field">
          <label>Thickness Name</label>
          <input
            disabled={action === STATE_EDIT}
            type="text"
            value={material.thickName}
            onChange={(event) => this.props.merge('thickName', event.target.value)}
          />
        </div>
        <div className="App-field">
          <label>Material Name</label>
          <input
            disabled={action === STATE_EDIT}
            type="text"
            value={material.name}
            onChange={(event) => this.props.merge('name', event.target.value)}
          />
        </div>
        <div className="App-field">
          <label>Thickness (mm)</label>
          <input
            type="number"
            value={material.thickness}
            onChange={(event) => this.props.merge('thickness', event.target.value)}
          />
        </div>

        <div className="App-sectionHeader">
          <p>Cut Settings</p>
        </div>
        <Cut cut={material.cut} updateCut={this.props.updateCut} />

        <div className="App-sectionHeader">
          <p>Score Settings</p>
          <div>
            <IconPlus click={this.props.addScore} />
          </div>
        </div>
        {
          material.scores.map((score, index) => {
            return (
              <Score
                id={index}
                score={score}
                updateScore={this.props.updateScore}
              />
            );
          })
        }

        <div className="App-sectionHeader">
          <p>Vector Engrave Settings</p>
          <div>
            <IconPlus click={this.props.addVectorEngrave} />
          </div>
        </div>
        {
          material.vectors.map((vector, index) => {
            return (
              <VectorEngrave
                id={index}
                vector={vector}
                updateVectorEngrave={this.props.updateVectorEngrave}
              />
            );
          })
        }

        <div className="App-sectionHeader">
          <p>Bitmap Engrave Settings</p>
          <div>
            <IconPlus click={this.props.addBitmapEngrave} />
          </div>
        </div>
        {
          material.bitmaps.map((bitmap, index) => {
            return (
              <BitmapEngrave
                id={index}
                bitmap={bitmap}
                updateBitmapEngrave={this.props.updateBitmapEngrave}
              />
            );
          })
        }
        <MaterialButtonBar
          action={this.props.action}
          addMaterial={this.props.addMaterial}
          cancelMaterial={this.props.cancelMaterial}
          editMaterial={this.props.editMaterial}
          material={this.props.material}
        />
      </React.Fragment>
    );
  }
}

export default MaterialEditor;
