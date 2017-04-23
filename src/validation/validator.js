function defaultPredicate() {
  return true;
}

export function required({ predicate = defaultPredicate } = {}) {
  return function(obj) {
    if(predicate(obj) && (obj.value + "").trim() == "") {
      obj = Object.assign({}, obj, {
        valid: false,
        error: "is required"
      });
    }

    return obj;
  }
}

export default class Validator {
	constructor(validators) {
		this.validators = validators;
	}

	validate(obj) {
		if(!obj.changed) {
			return obj;
		}

		obj = Object.assign({}, obj, {
			valid: true,
			error: null
		});

		for(var i = 0; i < this.validators.length; i++) {
			obj = this.validators[i](obj);
		}

		return obj;
	}
}
