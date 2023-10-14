import PropTypes from "prop-types";

export const ingredientPropType = PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    id: PropTypes.string,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
});
