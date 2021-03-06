/* global chrome:true */

import {
  getMaterials,
  storeMaterials,
  storeRawMaterials,
  getRawMaterials
} from './chromeWrappers';

async function removeMaterial(materialId) {
  const materials = await getMaterials();
  const newMaterials = await storeMaterials(
    materials.filter(material => material.id !== materialId)
  );
  console.log(`Material removed ${materialId}`);
  return newMaterials;
}

async function removeRawMaterial(title) {
  console.log(title)
  const rawMaterials = await getRawMaterials();
  const newRawMaterials = await storeRawMaterials(
    rawMaterials.filter(material => `${material.thickName} ${material.name}` !== title)
  );
  console.log(`Raw material removed ${title}`);
  return newRawMaterials;
}

/**
 * Creates a new custom material.
 */
function createMaterial(params, id) {
  let material = {
    id: `Custom:${id}`,
    title: `${params.thickName} ${params.name}`,
    sku: '',
    nominal_thickness: params.thickness,
    thickness_name: params.thickName,
    variety: {
      name: `${params.thickName.toLowerCase().replace(/[ ]/g, '-')}-${params.name.toLowerCase().replace(/[ ]/g, '-')}`,
      common_name: `${params.thickName} ${params.name}`,
      type_name: params.name,
      thumbnails: [
        chrome.extension.getURL('custom-material.png'),
      ],
      display_options: null
    },
    settings: [
      createSettings(params, 'basic'),
      createSettings(params, 'pro')
    ]
  };

  return material;
}

/**
 * Creates the settings for a given tube type.
 */
function createSettings(params, tubeType) {
  let settings = {
    description: `${params.thickName} ${params.name} Settings`,
    active_date: "2017-04-06T00:00-07:00",
    environment: [
      "production"
    ],
    tube_type: tubeType,
    cut_setting: createCutSettings(params.cut),
    score_settings: params.scores.map(score => {
      return createScoreSettings(score);
    }),
    vector_engrave_settings: params.vectors.map(vector => {
      return createVectorEngraveSettings(vector);
    }),
    bitmap_engrave_settings: params.bitmaps.map(bitmap => {
      return createBitmapEngraveSettings(bitmap);
    }),
  }
  return settings;
}

/**
 * Creates a new set of cut settings.
 */
function createCutSettings(cut) {
  return {
    power: cut.power,
    speed: cut.speed,
    passes: cut.passes,
    focal_offset: cut.focalOffset,
  };
}

/**
 * Creates a new set of score settings.
 */
function createScoreSettings(score) {
  return {
    power: score.power,
    speed: score.speed,
    passes: score.passes,
    focal_offset: score.focalOffset,
    uses: null,
    display_color_mask: null,
    outcome: {
      name: score.name,
      dev_id: score.name.toLowerCase().replace(/[ ]/g, '-'),
    },
  };
}

/**
 * Creates a new set of vector engrave settings.
 */
function createVectorEngraveSettings(vectorEngrave) {
  return {
    power: vectorEngrave.power,
    speed: vectorEngrave.speed,
    passes: vectorEngrave.passes,
    focal_offset: vectorEngrave.focalOffset,
    scangap: vectorEngrave.scanGap,
    uses: null,
    display_color_mask: null,
    outcome: {
      name: vectorEngrave.name,
      dev_id: vectorEngrave.name.toLowerCase().replace(/[ ]/g, '-'),
    },
  };
}

/**
 * Creates a new set of bitmap engrave settings.
 */
function createBitmapEngraveSettings(bitmapEngrave) {
  return {
    power: bitmapEngrave.power,
    speed: bitmapEngrave.speed,
    passes: bitmapEngrave.passes,
    focal_offset: bitmapEngrave.focalOffset,
    scangap: bitmapEngrave.scanGap,
    render_method: null,
    rescale_method: "LagrangeFilter",
    minimum_gray_percent: null,
    maximum_gray_percent: null,
    horizontal_timing: null,
    uses: null,
    display_color_mask: null,
    outcome: {
      name: bitmapEngrave.name,
      dev_id: bitmapEngrave.name.toLowerCase().replace(/[ ]/g, '-'),
    },
  };
}

export {
  createMaterial,
  removeMaterial,
  removeRawMaterial,
};
