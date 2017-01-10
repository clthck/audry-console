'use strict';

export default function ($form) {
  return $form
    .serializeArray()
    .reduce((o, f) => Object.assign({}, o, { [f.name]: f.value }), {});
};
