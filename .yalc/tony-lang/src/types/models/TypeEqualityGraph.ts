import { ParametricType } from './ParametricType'
import { Type } from './Type'
import { TypeEquivalenceClass } from './TypeEquivalenceClass'
import { TypeError } from '../../errors'
import { TypeVariable } from './TypeVariable'

export class TypeEqualityGraph {
  private _equivalenceClasses: TypeEquivalenceClass[]

  constructor(equivalenceClasses: TypeEquivalenceClass[] = []) {
    this._equivalenceClasses = equivalenceClasses
  }

  add = (typeVariable: TypeVariable, type: Type): void =>
    this.addEquivalenceClass(new TypeEquivalenceClass(this, [typeVariable, type]))

  private addEquivalenceClass = (equivalence: TypeEquivalenceClass): void => {
    const [
      unifiedEquivalenceClass,
      equivalenceClasses,
    ] = this._equivalenceClasses.reduce(
      (
        [unifiedEquivalenceClass, equivalenceClasses]: [
          TypeEquivalenceClass,
          TypeEquivalenceClass[],
        ],
        equivalenceClass,
      ) => {
        if (
          unifiedEquivalenceClass.types.some((type) =>
            equivalenceClass.includes(type),
          )
        )
          return [
            TypeEquivalenceClass.unify(this, [
              unifiedEquivalenceClass,
              equivalenceClass,
            ]),
            equivalenceClasses,
          ]

        return [
          unifiedEquivalenceClass,
          [...equivalenceClasses, equivalenceClass],
        ]
      },
      [equivalence, []],
    )

    this._equivalenceClasses = [...equivalenceClasses, unifiedEquivalenceClass]
  }

  reduce = (type: Type): Type =>
    this.equivalenceClass(type)?.representative(this) || type

  private equivalenceClass = (type: Type): TypeEquivalenceClass | undefined =>
    this._equivalenceClasses.find((equivalenceClass) =>
      equivalenceClass.includes(type),
    )

  toString = (): string => {
    if (this._equivalenceClasses.length == 0) return ''

    const equivalenceClasses = this._equivalenceClasses
      .map((equivalenceClass) => equivalenceClass.toString())
      .join(', ')
    return `{${equivalenceClasses}}`
  }

  // private connectedComponent = (start: Type): Set<TypeEquality> =>
  //   new Set(this.buildConnectedComponent([start]))

  // private buildConnectedComponent = (
  //   frontier: Type[],
  //   explored: TypeEquality[] = [],
  // ): TypeEquality[] => {
  //   if (frontier.length == 0) return explored

  //   const [type, ...remainingFrontier] = frontier
  //   return Array.from(this._internal).reduce((newExplored, typeEquality) => {
  //     if (!explored.includes(typeEquality) && typeEquality.has(type))
  //       return this.buildConnectedComponent(remainingFrontier, [
  //         ...newExplored,
  //         typeEquality,
  //       ])
  //     return newExplored
  //   }, explored)
  // }

  static build = (
    ...typeEqualityGraphs: TypeEqualityGraph[]
  ): TypeEqualityGraph | undefined =>
    TypeError.safe(() =>
      typeEqualityGraphs.reduce(
        (unifiedTypeEqualityGraph, typeEqualityGraph) => {
          typeEqualityGraph._equivalenceClasses.forEach((equivalenceClass) =>
            unifiedTypeEqualityGraph.addEquivalenceClass(equivalenceClass),
          )
          return unifiedTypeEqualityGraph
        },
      ),
    )

  // private static reduce = (
  //   frontier: TypeEquality[],
  //   explored: Set<TypeEquality> = new Set(),
  // ): Set<TypeEquality> => {
  //   if (frontier.length == 0) return explored

  //   const [typeEquality, ...remainingFrontier] = frontier
  //   const newFrontier = Array.from(explored).reduce(
  //     (newFrontier, otherTypeEquality) => {
  //       if (typeEquality.types.some((type) => otherTypeEquality.has(type)))
  //         return [
  //           ...newFrontier,
  //           ...TypeEqualityGraph.unify(otherTypeEquality, typeEquality),
  //         ]

  //       return newFrontier
  //     },
  //     remainingFrontier,
  //   )

  //   if (newFrontier.length == remainingFrontier.length)
  //     return TypeEqualityGraph.reduce(
  //       remainingFrontier,
  //       new Set([...explored, typeEquality]),
  //     )
  //   else return TypeEqualityGraph.reduce(newFrontier, explored)
  // }

  // private static unify = (
  //   expected: TypeEquality,
  //   actual: TypeEquality,
  // ): Set<TypeEquality> => {
  //   const typeEqualityGraph = new TypeEqualityGraph()

  //   expected.types.every((expectedType) =>
  //     actual.types.every(
  //       (actualType) =>
  //         actualType instanceof ParametricType &&
  //         expectedType.unsafeUnify(actualType, typeEqualityGraph),
  //     ),
  //   )

  //   return typeEqualityGraph._internal
  // }
}
