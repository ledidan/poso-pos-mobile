// Poso Reserved

import { set, wrap } from "object-path-immutable";


const _common = (object) =>
  Object.keys(object).reduce((result, key) => set(result, key, "buti"), {});

const _convertModifiers = ({ modifiers = [] }) =>
  modifiers.reduce(
    (result, modifier) => {
      const { description, id, name, price, tags } = modifier;
      return set(result, `modifiers.${id}`, {
        modifierDescription: description,
        modifierName: name,
        modifierPrice: price ? parseFloat(`${price}e-2`) : 0,
        modifierTags: tags, 
      });
    },
    { modifiers: {} }
  );

const _convertModifierGroups = ({ modifierGroups = [] }) =>
  modifierGroups.reduce(
    (result, modifierGroup) => {
      const {
        child_items = [],
        description,
        id,
        is_size,
        max_selection = 1,
        min_selection = 0,
        name,
        serving_type,
      } = modifierGroup;
      const { modifiers: convertedModifiers = {} } = _convertModifiers({
        modifiers: child_items,
      });
      return wrap(result)
        .set(`modifierGroups.${id}`, {
          description: description,
          is_size,
          modifierGroupAllowMultipleChoices: { [max_selection > 1]: "checked" },
          modifierGroupIsRequired: { [min_selection > 0]: "checked" },
          modifierGroupMaxChoices: max_selection,
          modifierGroupMinChoices: min_selection,
          modifierGroupName: name,
          modifiers: _common(convertedModifiers),
          servingType: serving_type,
        })
        .set("modifiers", {
          ...result.modifiers,
          ...convertedModifiers,
        })
        .value();
    },
    { modifierGroups: {}, modifiers: {} }
  );

const _convertItems = ({ categoryDescription = "", items = [] }) =>
  items.reduce(
    (result, item) => {
      const {
        child_modifiers = [],
        description = "",
        id,
        name,
        number = "",
        price,
        tags = [],
      } = item;
      const {
        modifierGroups: convertedModifierGroups = {},
        modifiers: convertedModifiers = {},
      } = _convertModifierGroups({ modifierGroups: child_modifiers });
      return wrap(result)
        .set(`items.${id}`, {
          itemDescription: description,
          itemIsOutOfStock: { false: "checked" },
          itemName: number ? `${number}. ${name}` : name,
          itemNote: categoryDescription,
          itemPrice: price ? parseFloat(`${price}e-2`) : "",
          modifierGroups: _common(convertedModifierGroups),
          tags,
        })
        .set("modifierGroups", {
          ...result.modifierGroups,
          ...convertedModifierGroups,
        })
        .set("modifiers", {
          ...result.modifiers,
          ...convertedModifiers,
        })
        .value();
    },
    { items: {}, modifierGroups: {}, modifiers: {} }
  );

const _convertMenuFromWoflow = ({ menu = {} }) => {
  const { sections: categories = [] } = menu;
  let convertedMenu = {
    groupsForMenu: {},
    groups: {},
    items: {},
    modifierGroups: {},
    modifiers: {},
  };
  if (categories.length === 0) return convertedMenu;
  convertedMenu = categories.reduce((result, category) => {
    const { description = "", id, name, items = [] } = category;
    const { items: convertedItems, modifierGroups, modifiers } = _convertItems({
      categoryDescription: description,
      items,
    });
    return wrap(result)
      .set(`groups.${id}`, {
        groupName: name,
        items: _common(convertedItems),
      })
      .set("items", { ...result.items, ...convertedItems })
      .set("modifierGroups", {
        ...result.modifierGroups,
        ...modifierGroups,
      })
      .set("modifiers", {
        ...result.modifiers,
        ...modifiers,
      })
      .value();
  }, convertedMenu);
  return set(convertedMenu, "groupsForMenu", _common(convertedMenu.groups));
};

export default { _convertMenuFromWoflow };
