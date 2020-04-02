import {
  ParametricType,
  Type,
  TypeConstraints,
  TypeVariable,
  MAP_TYPE
} from '../types'

export class InferMapType {
  private typeConstraints: TypeConstraints

  constructor(typeConstraints: TypeConstraints) {
    this.typeConstraints = typeConstraints
  }

  perform = (mapTypes: Type[]): ParametricType => mapTypes
    .reduce((mapType: ParametricType, otherMapType) => {
      return mapType.unify(otherMapType, this.typeConstraints)
    }, new ParametricType(MAP_TYPE, [new TypeVariable, new TypeVariable]))
}
