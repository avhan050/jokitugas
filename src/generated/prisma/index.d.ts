
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model TaskMessage
 * 
 */
export type TaskMessage = $Result.DefaultSelection<Prisma.$TaskMessagePayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>
/**
 * Model AdminSettings
 * 
 */
export type AdminSettings = $Result.DefaultSelection<Prisma.$AdminSettingsPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.taskMessage`: Exposes CRUD operations for the **TaskMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TaskMessages
    * const taskMessages = await prisma.taskMessage.findMany()
    * ```
    */
  get taskMessage(): Prisma.TaskMessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.adminSettings`: Exposes CRUD operations for the **AdminSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminSettings
    * const adminSettings = await prisma.adminSettings.findMany()
    * ```
    */
  get adminSettings(): Prisma.AdminSettingsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Task: 'Task',
    TaskMessage: 'TaskMessage',
    Transaction: 'Transaction',
    AdminSettings: 'AdminSettings'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "task" | "taskMessage" | "transaction" | "adminSettings"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      TaskMessage: {
        payload: Prisma.$TaskMessagePayload<ExtArgs>
        fields: Prisma.TaskMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskMessagePayload>
          }
          findFirst: {
            args: Prisma.TaskMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskMessagePayload>
          }
          findMany: {
            args: Prisma.TaskMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskMessagePayload>[]
          }
          create: {
            args: Prisma.TaskMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskMessagePayload>
          }
          createMany: {
            args: Prisma.TaskMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskMessagePayload>[]
          }
          delete: {
            args: Prisma.TaskMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskMessagePayload>
          }
          update: {
            args: Prisma.TaskMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskMessagePayload>
          }
          deleteMany: {
            args: Prisma.TaskMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskMessagePayload>[]
          }
          upsert: {
            args: Prisma.TaskMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskMessagePayload>
          }
          aggregate: {
            args: Prisma.TaskMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTaskMessage>
          }
          groupBy: {
            args: Prisma.TaskMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskMessageCountArgs<ExtArgs>
            result: $Utils.Optional<TaskMessageCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
      AdminSettings: {
        payload: Prisma.$AdminSettingsPayload<ExtArgs>
        fields: Prisma.AdminSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload>
          }
          findFirst: {
            args: Prisma.AdminSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload>
          }
          findMany: {
            args: Prisma.AdminSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload>[]
          }
          create: {
            args: Prisma.AdminSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload>
          }
          createMany: {
            args: Prisma.AdminSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload>[]
          }
          delete: {
            args: Prisma.AdminSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload>
          }
          update: {
            args: Prisma.AdminSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload>
          }
          deleteMany: {
            args: Prisma.AdminSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminSettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload>[]
          }
          upsert: {
            args: Prisma.AdminSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingsPayload>
          }
          aggregate: {
            args: Prisma.AdminSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminSettings>
          }
          groupBy: {
            args: Prisma.AdminSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<AdminSettingsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    task?: TaskOmit
    taskMessage?: TaskMessageOmit
    transaction?: TransactionOmit
    adminSettings?: AdminSettingsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    tasksAsClient: number
    tasksAsWorker: number
    transactions: number
    taskMessages: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasksAsClient?: boolean | UserCountOutputTypeCountTasksAsClientArgs
    tasksAsWorker?: boolean | UserCountOutputTypeCountTasksAsWorkerArgs
    transactions?: boolean | UserCountOutputTypeCountTransactionsArgs
    taskMessages?: boolean | UserCountOutputTypeCountTaskMessagesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTasksAsClientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTasksAsWorkerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTaskMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskMessageWhereInput
  }


  /**
   * Count Type TaskCountOutputType
   */

  export type TaskCountOutputType = {
    messages: number
  }

  export type TaskCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | TaskCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCountOutputType
     */
    select?: TaskCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskMessageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    balance: number | null
    rating: number | null
    completedJobs: number | null
  }

  export type UserSumAggregateOutputType = {
    balance: number | null
    rating: number | null
    completedJobs: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: string | null
    balance: number | null
    rating: number | null
    completedJobs: number | null
    createdAt: Date | null
    isAdmin: boolean | null
    telegramChatId: string | null
    telegramLinkCode: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: string | null
    balance: number | null
    rating: number | null
    completedJobs: number | null
    createdAt: Date | null
    isAdmin: boolean | null
    telegramChatId: string | null
    telegramLinkCode: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    role: number
    balance: number
    rating: number
    completedJobs: number
    createdAt: number
    isAdmin: number
    telegramChatId: number
    telegramLinkCode: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    balance?: true
    rating?: true
    completedJobs?: true
  }

  export type UserSumAggregateInputType = {
    balance?: true
    rating?: true
    completedJobs?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    balance?: true
    rating?: true
    completedJobs?: true
    createdAt?: true
    isAdmin?: true
    telegramChatId?: true
    telegramLinkCode?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    balance?: true
    rating?: true
    completedJobs?: true
    createdAt?: true
    isAdmin?: true
    telegramChatId?: true
    telegramLinkCode?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    balance?: true
    rating?: true
    completedJobs?: true
    createdAt?: true
    isAdmin?: true
    telegramChatId?: true
    telegramLinkCode?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    password: string
    role: string
    balance: number
    rating: number
    completedJobs: number
    createdAt: Date
    isAdmin: boolean
    telegramChatId: string | null
    telegramLinkCode: string | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    balance?: boolean
    rating?: boolean
    completedJobs?: boolean
    createdAt?: boolean
    isAdmin?: boolean
    telegramChatId?: boolean
    telegramLinkCode?: boolean
    tasksAsClient?: boolean | User$tasksAsClientArgs<ExtArgs>
    tasksAsWorker?: boolean | User$tasksAsWorkerArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    taskMessages?: boolean | User$taskMessagesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    balance?: boolean
    rating?: boolean
    completedJobs?: boolean
    createdAt?: boolean
    isAdmin?: boolean
    telegramChatId?: boolean
    telegramLinkCode?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    balance?: boolean
    rating?: boolean
    completedJobs?: boolean
    createdAt?: boolean
    isAdmin?: boolean
    telegramChatId?: boolean
    telegramLinkCode?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    balance?: boolean
    rating?: boolean
    completedJobs?: boolean
    createdAt?: boolean
    isAdmin?: boolean
    telegramChatId?: boolean
    telegramLinkCode?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "role" | "balance" | "rating" | "completedJobs" | "createdAt" | "isAdmin" | "telegramChatId" | "telegramLinkCode", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasksAsClient?: boolean | User$tasksAsClientArgs<ExtArgs>
    tasksAsWorker?: boolean | User$tasksAsWorkerArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    taskMessages?: boolean | User$taskMessagesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      tasksAsClient: Prisma.$TaskPayload<ExtArgs>[]
      tasksAsWorker: Prisma.$TaskPayload<ExtArgs>[]
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
      taskMessages: Prisma.$TaskMessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      password: string
      role: string
      balance: number
      rating: number
      completedJobs: number
      createdAt: Date
      isAdmin: boolean
      telegramChatId: string | null
      telegramLinkCode: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tasksAsClient<T extends User$tasksAsClientArgs<ExtArgs> = {}>(args?: Subset<T, User$tasksAsClientArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tasksAsWorker<T extends User$tasksAsWorkerArgs<ExtArgs> = {}>(args?: Subset<T, User$tasksAsWorkerArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transactions<T extends User$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    taskMessages<T extends User$taskMessagesArgs<ExtArgs> = {}>(args?: Subset<T, User$taskMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly balance: FieldRef<"User", 'Float'>
    readonly rating: FieldRef<"User", 'Float'>
    readonly completedJobs: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly isAdmin: FieldRef<"User", 'Boolean'>
    readonly telegramChatId: FieldRef<"User", 'String'>
    readonly telegramLinkCode: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.tasksAsClient
   */
  export type User$tasksAsClientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * User.tasksAsWorker
   */
  export type User$tasksAsWorkerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * User.transactions
   */
  export type User$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * User.taskMessages
   */
  export type User$taskMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskMessage
     */
    select?: TaskMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskMessage
     */
    omit?: TaskMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskMessageInclude<ExtArgs> | null
    where?: TaskMessageWhereInput
    orderBy?: TaskMessageOrderByWithRelationInput | TaskMessageOrderByWithRelationInput[]
    cursor?: TaskMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskMessageScalarFieldEnum | TaskMessageScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskAvgAggregateOutputType = {
    budget: number | null
    clientRating: number | null
    workerRating: number | null
  }

  export type TaskSumAggregateOutputType = {
    budget: number | null
    clientRating: number | null
    workerRating: number | null
  }

  export type TaskMinAggregateOutputType = {
    id: string | null
    clientId: string | null
    workerId: string | null
    title: string | null
    description: string | null
    category: string | null
    deadline: Date | null
    budget: number | null
    status: string | null
    createdAt: Date | null
    completedAt: Date | null
    clientRating: number | null
    workerRating: number | null
    escrowHeld: boolean | null
    submissionNote: string | null
    submissionUrl: string | null
    takenAt: Date | null
    disputeReason: string | null
    disputedAt: Date | null
  }

  export type TaskMaxAggregateOutputType = {
    id: string | null
    clientId: string | null
    workerId: string | null
    title: string | null
    description: string | null
    category: string | null
    deadline: Date | null
    budget: number | null
    status: string | null
    createdAt: Date | null
    completedAt: Date | null
    clientRating: number | null
    workerRating: number | null
    escrowHeld: boolean | null
    submissionNote: string | null
    submissionUrl: string | null
    takenAt: Date | null
    disputeReason: string | null
    disputedAt: Date | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    clientId: number
    workerId: number
    title: number
    description: number
    category: number
    deadline: number
    budget: number
    status: number
    createdAt: number
    completedAt: number
    clientRating: number
    workerRating: number
    escrowHeld: number
    submissionNote: number
    submissionUrl: number
    takenAt: number
    disputeReason: number
    disputedAt: number
    _all: number
  }


  export type TaskAvgAggregateInputType = {
    budget?: true
    clientRating?: true
    workerRating?: true
  }

  export type TaskSumAggregateInputType = {
    budget?: true
    clientRating?: true
    workerRating?: true
  }

  export type TaskMinAggregateInputType = {
    id?: true
    clientId?: true
    workerId?: true
    title?: true
    description?: true
    category?: true
    deadline?: true
    budget?: true
    status?: true
    createdAt?: true
    completedAt?: true
    clientRating?: true
    workerRating?: true
    escrowHeld?: true
    submissionNote?: true
    submissionUrl?: true
    takenAt?: true
    disputeReason?: true
    disputedAt?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    clientId?: true
    workerId?: true
    title?: true
    description?: true
    category?: true
    deadline?: true
    budget?: true
    status?: true
    createdAt?: true
    completedAt?: true
    clientRating?: true
    workerRating?: true
    escrowHeld?: true
    submissionNote?: true
    submissionUrl?: true
    takenAt?: true
    disputeReason?: true
    disputedAt?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    clientId?: true
    workerId?: true
    title?: true
    description?: true
    category?: true
    deadline?: true
    budget?: true
    status?: true
    createdAt?: true
    completedAt?: true
    clientRating?: true
    workerRating?: true
    escrowHeld?: true
    submissionNote?: true
    submissionUrl?: true
    takenAt?: true
    disputeReason?: true
    disputedAt?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _avg?: TaskAvgAggregateInputType
    _sum?: TaskSumAggregateInputType
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: string
    clientId: string
    workerId: string | null
    title: string
    description: string
    category: string
    deadline: Date
    budget: number
    status: string
    createdAt: Date
    completedAt: Date | null
    clientRating: number | null
    workerRating: number | null
    escrowHeld: boolean
    submissionNote: string | null
    submissionUrl: string | null
    takenAt: Date | null
    disputeReason: string | null
    disputedAt: Date | null
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    workerId?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    deadline?: boolean
    budget?: boolean
    status?: boolean
    createdAt?: boolean
    completedAt?: boolean
    clientRating?: boolean
    workerRating?: boolean
    escrowHeld?: boolean
    submissionNote?: boolean
    submissionUrl?: boolean
    takenAt?: boolean
    disputeReason?: boolean
    disputedAt?: boolean
    client?: boolean | UserDefaultArgs<ExtArgs>
    worker?: boolean | Task$workerArgs<ExtArgs>
    messages?: boolean | Task$messagesArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    workerId?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    deadline?: boolean
    budget?: boolean
    status?: boolean
    createdAt?: boolean
    completedAt?: boolean
    clientRating?: boolean
    workerRating?: boolean
    escrowHeld?: boolean
    submissionNote?: boolean
    submissionUrl?: boolean
    takenAt?: boolean
    disputeReason?: boolean
    disputedAt?: boolean
    client?: boolean | UserDefaultArgs<ExtArgs>
    worker?: boolean | Task$workerArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    workerId?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    deadline?: boolean
    budget?: boolean
    status?: boolean
    createdAt?: boolean
    completedAt?: boolean
    clientRating?: boolean
    workerRating?: boolean
    escrowHeld?: boolean
    submissionNote?: boolean
    submissionUrl?: boolean
    takenAt?: boolean
    disputeReason?: boolean
    disputedAt?: boolean
    client?: boolean | UserDefaultArgs<ExtArgs>
    worker?: boolean | Task$workerArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    id?: boolean
    clientId?: boolean
    workerId?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    deadline?: boolean
    budget?: boolean
    status?: boolean
    createdAt?: boolean
    completedAt?: boolean
    clientRating?: boolean
    workerRating?: boolean
    escrowHeld?: boolean
    submissionNote?: boolean
    submissionUrl?: boolean
    takenAt?: boolean
    disputeReason?: boolean
    disputedAt?: boolean
  }

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clientId" | "workerId" | "title" | "description" | "category" | "deadline" | "budget" | "status" | "createdAt" | "completedAt" | "clientRating" | "workerRating" | "escrowHeld" | "submissionNote" | "submissionUrl" | "takenAt" | "disputeReason" | "disputedAt", ExtArgs["result"]["task"]>
  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | UserDefaultArgs<ExtArgs>
    worker?: boolean | Task$workerArgs<ExtArgs>
    messages?: boolean | Task$messagesArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | UserDefaultArgs<ExtArgs>
    worker?: boolean | Task$workerArgs<ExtArgs>
  }
  export type TaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | UserDefaultArgs<ExtArgs>
    worker?: boolean | Task$workerArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      client: Prisma.$UserPayload<ExtArgs>
      worker: Prisma.$UserPayload<ExtArgs> | null
      messages: Prisma.$TaskMessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clientId: string
      workerId: string | null
      title: string
      description: string
      category: string
      deadline: Date
      budget: number
      status: string
      createdAt: Date
      completedAt: Date | null
      clientRating: number | null
      workerRating: number | null
      escrowHeld: boolean
      submissionNote: string | null
      submissionUrl: string | null
      takenAt: Date | null
      disputeReason: string | null
      disputedAt: Date | null
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {TaskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    worker<T extends Task$workerArgs<ExtArgs> = {}>(args?: Subset<T, Task$workerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    messages<T extends Task$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Task$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'String'>
    readonly clientId: FieldRef<"Task", 'String'>
    readonly workerId: FieldRef<"Task", 'String'>
    readonly title: FieldRef<"Task", 'String'>
    readonly description: FieldRef<"Task", 'String'>
    readonly category: FieldRef<"Task", 'String'>
    readonly deadline: FieldRef<"Task", 'DateTime'>
    readonly budget: FieldRef<"Task", 'Float'>
    readonly status: FieldRef<"Task", 'String'>
    readonly createdAt: FieldRef<"Task", 'DateTime'>
    readonly completedAt: FieldRef<"Task", 'DateTime'>
    readonly clientRating: FieldRef<"Task", 'Int'>
    readonly workerRating: FieldRef<"Task", 'Int'>
    readonly escrowHeld: FieldRef<"Task", 'Boolean'>
    readonly submissionNote: FieldRef<"Task", 'String'>
    readonly submissionUrl: FieldRef<"Task", 'String'>
    readonly takenAt: FieldRef<"Task", 'DateTime'>
    readonly disputeReason: FieldRef<"Task", 'String'>
    readonly disputedAt: FieldRef<"Task", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task updateManyAndReturn
   */
  export type TaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task.worker
   */
  export type Task$workerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Task.messages
   */
  export type Task$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskMessage
     */
    select?: TaskMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskMessage
     */
    omit?: TaskMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskMessageInclude<ExtArgs> | null
    where?: TaskMessageWhereInput
    orderBy?: TaskMessageOrderByWithRelationInput | TaskMessageOrderByWithRelationInput[]
    cursor?: TaskMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskMessageScalarFieldEnum | TaskMessageScalarFieldEnum[]
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model TaskMessage
   */

  export type AggregateTaskMessage = {
    _count: TaskMessageCountAggregateOutputType | null
    _min: TaskMessageMinAggregateOutputType | null
    _max: TaskMessageMaxAggregateOutputType | null
  }

  export type TaskMessageMinAggregateOutputType = {
    id: string | null
    taskId: string | null
    senderId: string | null
    content: string | null
    createdAt: Date | null
  }

  export type TaskMessageMaxAggregateOutputType = {
    id: string | null
    taskId: string | null
    senderId: string | null
    content: string | null
    createdAt: Date | null
  }

  export type TaskMessageCountAggregateOutputType = {
    id: number
    taskId: number
    senderId: number
    content: number
    createdAt: number
    _all: number
  }


  export type TaskMessageMinAggregateInputType = {
    id?: true
    taskId?: true
    senderId?: true
    content?: true
    createdAt?: true
  }

  export type TaskMessageMaxAggregateInputType = {
    id?: true
    taskId?: true
    senderId?: true
    content?: true
    createdAt?: true
  }

  export type TaskMessageCountAggregateInputType = {
    id?: true
    taskId?: true
    senderId?: true
    content?: true
    createdAt?: true
    _all?: true
  }

  export type TaskMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskMessage to aggregate.
     */
    where?: TaskMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskMessages to fetch.
     */
    orderBy?: TaskMessageOrderByWithRelationInput | TaskMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TaskMessages
    **/
    _count?: true | TaskMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMessageMaxAggregateInputType
  }

  export type GetTaskMessageAggregateType<T extends TaskMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateTaskMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaskMessage[P]>
      : GetScalarType<T[P], AggregateTaskMessage[P]>
  }




  export type TaskMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskMessageWhereInput
    orderBy?: TaskMessageOrderByWithAggregationInput | TaskMessageOrderByWithAggregationInput[]
    by: TaskMessageScalarFieldEnum[] | TaskMessageScalarFieldEnum
    having?: TaskMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskMessageCountAggregateInputType | true
    _min?: TaskMessageMinAggregateInputType
    _max?: TaskMessageMaxAggregateInputType
  }

  export type TaskMessageGroupByOutputType = {
    id: string
    taskId: string
    senderId: string
    content: string
    createdAt: Date
    _count: TaskMessageCountAggregateOutputType | null
    _min: TaskMessageMinAggregateOutputType | null
    _max: TaskMessageMaxAggregateOutputType | null
  }

  type GetTaskMessageGroupByPayload<T extends TaskMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskMessageGroupByOutputType[P]>
            : GetScalarType<T[P], TaskMessageGroupByOutputType[P]>
        }
      >
    >


  export type TaskMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    senderId?: boolean
    content?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskMessage"]>

  export type TaskMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    senderId?: boolean
    content?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskMessage"]>

  export type TaskMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    senderId?: boolean
    content?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskMessage"]>

  export type TaskMessageSelectScalar = {
    id?: boolean
    taskId?: boolean
    senderId?: boolean
    content?: boolean
    createdAt?: boolean
  }

  export type TaskMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "taskId" | "senderId" | "content" | "createdAt", ExtArgs["result"]["taskMessage"]>
  export type TaskMessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TaskMessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TaskMessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TaskMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TaskMessage"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
      sender: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      taskId: string
      senderId: string
      content: string
      createdAt: Date
    }, ExtArgs["result"]["taskMessage"]>
    composites: {}
  }

  type TaskMessageGetPayload<S extends boolean | null | undefined | TaskMessageDefaultArgs> = $Result.GetResult<Prisma.$TaskMessagePayload, S>

  type TaskMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskMessageCountAggregateInputType | true
    }

  export interface TaskMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TaskMessage'], meta: { name: 'TaskMessage' } }
    /**
     * Find zero or one TaskMessage that matches the filter.
     * @param {TaskMessageFindUniqueArgs} args - Arguments to find a TaskMessage
     * @example
     * // Get one TaskMessage
     * const taskMessage = await prisma.taskMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskMessageFindUniqueArgs>(args: SelectSubset<T, TaskMessageFindUniqueArgs<ExtArgs>>): Prisma__TaskMessageClient<$Result.GetResult<Prisma.$TaskMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TaskMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskMessageFindUniqueOrThrowArgs} args - Arguments to find a TaskMessage
     * @example
     * // Get one TaskMessage
     * const taskMessage = await prisma.taskMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskMessageClient<$Result.GetResult<Prisma.$TaskMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskMessageFindFirstArgs} args - Arguments to find a TaskMessage
     * @example
     * // Get one TaskMessage
     * const taskMessage = await prisma.taskMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskMessageFindFirstArgs>(args?: SelectSubset<T, TaskMessageFindFirstArgs<ExtArgs>>): Prisma__TaskMessageClient<$Result.GetResult<Prisma.$TaskMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskMessageFindFirstOrThrowArgs} args - Arguments to find a TaskMessage
     * @example
     * // Get one TaskMessage
     * const taskMessage = await prisma.taskMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskMessageClient<$Result.GetResult<Prisma.$TaskMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TaskMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TaskMessages
     * const taskMessages = await prisma.taskMessage.findMany()
     * 
     * // Get first 10 TaskMessages
     * const taskMessages = await prisma.taskMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskMessageWithIdOnly = await prisma.taskMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskMessageFindManyArgs>(args?: SelectSubset<T, TaskMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TaskMessage.
     * @param {TaskMessageCreateArgs} args - Arguments to create a TaskMessage.
     * @example
     * // Create one TaskMessage
     * const TaskMessage = await prisma.taskMessage.create({
     *   data: {
     *     // ... data to create a TaskMessage
     *   }
     * })
     * 
     */
    create<T extends TaskMessageCreateArgs>(args: SelectSubset<T, TaskMessageCreateArgs<ExtArgs>>): Prisma__TaskMessageClient<$Result.GetResult<Prisma.$TaskMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TaskMessages.
     * @param {TaskMessageCreateManyArgs} args - Arguments to create many TaskMessages.
     * @example
     * // Create many TaskMessages
     * const taskMessage = await prisma.taskMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskMessageCreateManyArgs>(args?: SelectSubset<T, TaskMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TaskMessages and returns the data saved in the database.
     * @param {TaskMessageCreateManyAndReturnArgs} args - Arguments to create many TaskMessages.
     * @example
     * // Create many TaskMessages
     * const taskMessage = await prisma.taskMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TaskMessages and only return the `id`
     * const taskMessageWithIdOnly = await prisma.taskMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TaskMessage.
     * @param {TaskMessageDeleteArgs} args - Arguments to delete one TaskMessage.
     * @example
     * // Delete one TaskMessage
     * const TaskMessage = await prisma.taskMessage.delete({
     *   where: {
     *     // ... filter to delete one TaskMessage
     *   }
     * })
     * 
     */
    delete<T extends TaskMessageDeleteArgs>(args: SelectSubset<T, TaskMessageDeleteArgs<ExtArgs>>): Prisma__TaskMessageClient<$Result.GetResult<Prisma.$TaskMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TaskMessage.
     * @param {TaskMessageUpdateArgs} args - Arguments to update one TaskMessage.
     * @example
     * // Update one TaskMessage
     * const taskMessage = await prisma.taskMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskMessageUpdateArgs>(args: SelectSubset<T, TaskMessageUpdateArgs<ExtArgs>>): Prisma__TaskMessageClient<$Result.GetResult<Prisma.$TaskMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TaskMessages.
     * @param {TaskMessageDeleteManyArgs} args - Arguments to filter TaskMessages to delete.
     * @example
     * // Delete a few TaskMessages
     * const { count } = await prisma.taskMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskMessageDeleteManyArgs>(args?: SelectSubset<T, TaskMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TaskMessages
     * const taskMessage = await prisma.taskMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskMessageUpdateManyArgs>(args: SelectSubset<T, TaskMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskMessages and returns the data updated in the database.
     * @param {TaskMessageUpdateManyAndReturnArgs} args - Arguments to update many TaskMessages.
     * @example
     * // Update many TaskMessages
     * const taskMessage = await prisma.taskMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TaskMessages and only return the `id`
     * const taskMessageWithIdOnly = await prisma.taskMessage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TaskMessage.
     * @param {TaskMessageUpsertArgs} args - Arguments to update or create a TaskMessage.
     * @example
     * // Update or create a TaskMessage
     * const taskMessage = await prisma.taskMessage.upsert({
     *   create: {
     *     // ... data to create a TaskMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TaskMessage we want to update
     *   }
     * })
     */
    upsert<T extends TaskMessageUpsertArgs>(args: SelectSubset<T, TaskMessageUpsertArgs<ExtArgs>>): Prisma__TaskMessageClient<$Result.GetResult<Prisma.$TaskMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TaskMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskMessageCountArgs} args - Arguments to filter TaskMessages to count.
     * @example
     * // Count the number of TaskMessages
     * const count = await prisma.taskMessage.count({
     *   where: {
     *     // ... the filter for the TaskMessages we want to count
     *   }
     * })
    **/
    count<T extends TaskMessageCountArgs>(
      args?: Subset<T, TaskMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TaskMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskMessageAggregateArgs>(args: Subset<T, TaskMessageAggregateArgs>): Prisma.PrismaPromise<GetTaskMessageAggregateType<T>>

    /**
     * Group by TaskMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskMessageGroupByArgs['orderBy'] }
        : { orderBy?: TaskMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TaskMessage model
   */
  readonly fields: TaskMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TaskMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sender<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TaskMessage model
   */
  interface TaskMessageFieldRefs {
    readonly id: FieldRef<"TaskMessage", 'String'>
    readonly taskId: FieldRef<"TaskMessage", 'String'>
    readonly senderId: FieldRef<"TaskMessage", 'String'>
    readonly content: FieldRef<"TaskMessage", 'String'>
    readonly createdAt: FieldRef<"TaskMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TaskMessage findUnique
   */
  export type TaskMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskMessage
     */
    select?: TaskMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskMessage
     */
    omit?: TaskMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskMessageInclude<ExtArgs> | null
    /**
     * Filter, which TaskMessage to fetch.
     */
    where: TaskMessageWhereUniqueInput
  }

  /**
   * TaskMessage findUniqueOrThrow
   */
  export type TaskMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskMessage
     */
    select?: TaskMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskMessage
     */
    omit?: TaskMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskMessageInclude<ExtArgs> | null
    /**
     * Filter, which TaskMessage to fetch.
     */
    where: TaskMessageWhereUniqueInput
  }

  /**
   * TaskMessage findFirst
   */
  export type TaskMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskMessage
     */
    select?: TaskMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskMessage
     */
    omit?: TaskMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskMessageInclude<ExtArgs> | null
    /**
     * Filter, which TaskMessage to fetch.
     */
    where?: TaskMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskMessages to fetch.
     */
    orderBy?: TaskMessageOrderByWithRelationInput | TaskMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskMessages.
     */
    cursor?: TaskMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskMessages.
     */
    distinct?: TaskMessageScalarFieldEnum | TaskMessageScalarFieldEnum[]
  }

  /**
   * TaskMessage findFirstOrThrow
   */
  export type TaskMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskMessage
     */
    select?: TaskMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskMessage
     */
    omit?: TaskMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskMessageInclude<ExtArgs> | null
    /**
     * Filter, which TaskMessage to fetch.
     */
    where?: TaskMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskMessages to fetch.
     */
    orderBy?: TaskMessageOrderByWithRelationInput | TaskMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskMessages.
     */
    cursor?: TaskMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskMessages.
     */
    distinct?: TaskMessageScalarFieldEnum | TaskMessageScalarFieldEnum[]
  }

  /**
   * TaskMessage findMany
   */
  export type TaskMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskMessage
     */
    select?: TaskMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskMessage
     */
    omit?: TaskMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskMessageInclude<ExtArgs> | null
    /**
     * Filter, which TaskMessages to fetch.
     */
    where?: TaskMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskMessages to fetch.
     */
    orderBy?: TaskMessageOrderByWithRelationInput | TaskMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TaskMessages.
     */
    cursor?: TaskMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskMessages.
     */
    skip?: number
    distinct?: TaskMessageScalarFieldEnum | TaskMessageScalarFieldEnum[]
  }

  /**
   * TaskMessage create
   */
  export type TaskMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskMessage
     */
    select?: TaskMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskMessage
     */
    omit?: TaskMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskMessageInclude<ExtArgs> | null
    /**
     * The data needed to create a TaskMessage.
     */
    data: XOR<TaskMessageCreateInput, TaskMessageUncheckedCreateInput>
  }

  /**
   * TaskMessage createMany
   */
  export type TaskMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TaskMessages.
     */
    data: TaskMessageCreateManyInput | TaskMessageCreateManyInput[]
  }

  /**
   * TaskMessage createManyAndReturn
   */
  export type TaskMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskMessage
     */
    select?: TaskMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskMessage
     */
    omit?: TaskMessageOmit<ExtArgs> | null
    /**
     * The data used to create many TaskMessages.
     */
    data: TaskMessageCreateManyInput | TaskMessageCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskMessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskMessage update
   */
  export type TaskMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskMessage
     */
    select?: TaskMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskMessage
     */
    omit?: TaskMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskMessageInclude<ExtArgs> | null
    /**
     * The data needed to update a TaskMessage.
     */
    data: XOR<TaskMessageUpdateInput, TaskMessageUncheckedUpdateInput>
    /**
     * Choose, which TaskMessage to update.
     */
    where: TaskMessageWhereUniqueInput
  }

  /**
   * TaskMessage updateMany
   */
  export type TaskMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TaskMessages.
     */
    data: XOR<TaskMessageUpdateManyMutationInput, TaskMessageUncheckedUpdateManyInput>
    /**
     * Filter which TaskMessages to update
     */
    where?: TaskMessageWhereInput
    /**
     * Limit how many TaskMessages to update.
     */
    limit?: number
  }

  /**
   * TaskMessage updateManyAndReturn
   */
  export type TaskMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskMessage
     */
    select?: TaskMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskMessage
     */
    omit?: TaskMessageOmit<ExtArgs> | null
    /**
     * The data used to update TaskMessages.
     */
    data: XOR<TaskMessageUpdateManyMutationInput, TaskMessageUncheckedUpdateManyInput>
    /**
     * Filter which TaskMessages to update
     */
    where?: TaskMessageWhereInput
    /**
     * Limit how many TaskMessages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskMessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskMessage upsert
   */
  export type TaskMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskMessage
     */
    select?: TaskMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskMessage
     */
    omit?: TaskMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskMessageInclude<ExtArgs> | null
    /**
     * The filter to search for the TaskMessage to update in case it exists.
     */
    where: TaskMessageWhereUniqueInput
    /**
     * In case the TaskMessage found by the `where` argument doesn't exist, create a new TaskMessage with this data.
     */
    create: XOR<TaskMessageCreateInput, TaskMessageUncheckedCreateInput>
    /**
     * In case the TaskMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskMessageUpdateInput, TaskMessageUncheckedUpdateInput>
  }

  /**
   * TaskMessage delete
   */
  export type TaskMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskMessage
     */
    select?: TaskMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskMessage
     */
    omit?: TaskMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskMessageInclude<ExtArgs> | null
    /**
     * Filter which TaskMessage to delete.
     */
    where: TaskMessageWhereUniqueInput
  }

  /**
   * TaskMessage deleteMany
   */
  export type TaskMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskMessages to delete
     */
    where?: TaskMessageWhereInput
    /**
     * Limit how many TaskMessages to delete.
     */
    limit?: number
  }

  /**
   * TaskMessage without action
   */
  export type TaskMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskMessage
     */
    select?: TaskMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskMessage
     */
    omit?: TaskMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskMessageInclude<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    amount: number | null
  }

  export type TransactionSumAggregateOutputType = {
    amount: number | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    amount: number | null
    taskId: string | null
    createdAt: Date | null
    desc: string | null
    status: string | null
    proofUrl: string | null
    note: string | null
    rejectionReason: string | null
    bankDetails: string | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    amount: number | null
    taskId: string | null
    createdAt: Date | null
    desc: string | null
    status: string | null
    proofUrl: string | null
    note: string | null
    rejectionReason: string | null
    bankDetails: string | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    amount: number
    taskId: number
    createdAt: number
    desc: number
    status: number
    proofUrl: number
    note: number
    rejectionReason: number
    bankDetails: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    amount?: true
  }

  export type TransactionSumAggregateInputType = {
    amount?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    amount?: true
    taskId?: true
    createdAt?: true
    desc?: true
    status?: true
    proofUrl?: true
    note?: true
    rejectionReason?: true
    bankDetails?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    amount?: true
    taskId?: true
    createdAt?: true
    desc?: true
    status?: true
    proofUrl?: true
    note?: true
    rejectionReason?: true
    bankDetails?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    amount?: true
    taskId?: true
    createdAt?: true
    desc?: true
    status?: true
    proofUrl?: true
    note?: true
    rejectionReason?: true
    bankDetails?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    userId: string
    type: string
    amount: number
    taskId: string | null
    createdAt: Date
    desc: string
    status: string
    proofUrl: string | null
    note: string | null
    rejectionReason: string | null
    bankDetails: string | null
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    amount?: boolean
    taskId?: boolean
    createdAt?: boolean
    desc?: boolean
    status?: boolean
    proofUrl?: boolean
    note?: boolean
    rejectionReason?: boolean
    bankDetails?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    amount?: boolean
    taskId?: boolean
    createdAt?: boolean
    desc?: boolean
    status?: boolean
    proofUrl?: boolean
    note?: boolean
    rejectionReason?: boolean
    bankDetails?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    amount?: boolean
    taskId?: boolean
    createdAt?: boolean
    desc?: boolean
    status?: boolean
    proofUrl?: boolean
    note?: boolean
    rejectionReason?: boolean
    bankDetails?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    amount?: boolean
    taskId?: boolean
    createdAt?: boolean
    desc?: boolean
    status?: boolean
    proofUrl?: boolean
    note?: boolean
    rejectionReason?: boolean
    bankDetails?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "amount" | "taskId" | "createdAt" | "desc" | "status" | "proofUrl" | "note" | "rejectionReason" | "bankDetails", ExtArgs["result"]["transaction"]>
  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      amount: number
      taskId: string | null
      createdAt: Date
      desc: string
      status: string
      proofUrl: string | null
      note: string | null
      rejectionReason: string | null
      bankDetails: string | null
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly userId: FieldRef<"Transaction", 'String'>
    readonly type: FieldRef<"Transaction", 'String'>
    readonly amount: FieldRef<"Transaction", 'Float'>
    readonly taskId: FieldRef<"Transaction", 'String'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
    readonly desc: FieldRef<"Transaction", 'String'>
    readonly status: FieldRef<"Transaction", 'String'>
    readonly proofUrl: FieldRef<"Transaction", 'String'>
    readonly note: FieldRef<"Transaction", 'String'>
    readonly rejectionReason: FieldRef<"Transaction", 'String'>
    readonly bankDetails: FieldRef<"Transaction", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
  }


  /**
   * Model AdminSettings
   */

  export type AggregateAdminSettings = {
    _count: AdminSettingsCountAggregateOutputType | null
    _min: AdminSettingsMinAggregateOutputType | null
    _max: AdminSettingsMaxAggregateOutputType | null
  }

  export type AdminSettingsMinAggregateOutputType = {
    id: string | null
    bank_name: string | null
    bank_account: string | null
    bank_owner: string | null
    e_wallet: string | null
  }

  export type AdminSettingsMaxAggregateOutputType = {
    id: string | null
    bank_name: string | null
    bank_account: string | null
    bank_owner: string | null
    e_wallet: string | null
  }

  export type AdminSettingsCountAggregateOutputType = {
    id: number
    bank_name: number
    bank_account: number
    bank_owner: number
    e_wallet: number
    _all: number
  }


  export type AdminSettingsMinAggregateInputType = {
    id?: true
    bank_name?: true
    bank_account?: true
    bank_owner?: true
    e_wallet?: true
  }

  export type AdminSettingsMaxAggregateInputType = {
    id?: true
    bank_name?: true
    bank_account?: true
    bank_owner?: true
    e_wallet?: true
  }

  export type AdminSettingsCountAggregateInputType = {
    id?: true
    bank_name?: true
    bank_account?: true
    bank_owner?: true
    e_wallet?: true
    _all?: true
  }

  export type AdminSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminSettings to aggregate.
     */
    where?: AdminSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminSettings to fetch.
     */
    orderBy?: AdminSettingsOrderByWithRelationInput | AdminSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminSettings
    **/
    _count?: true | AdminSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminSettingsMaxAggregateInputType
  }

  export type GetAdminSettingsAggregateType<T extends AdminSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminSettings[P]>
      : GetScalarType<T[P], AggregateAdminSettings[P]>
  }




  export type AdminSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminSettingsWhereInput
    orderBy?: AdminSettingsOrderByWithAggregationInput | AdminSettingsOrderByWithAggregationInput[]
    by: AdminSettingsScalarFieldEnum[] | AdminSettingsScalarFieldEnum
    having?: AdminSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminSettingsCountAggregateInputType | true
    _min?: AdminSettingsMinAggregateInputType
    _max?: AdminSettingsMaxAggregateInputType
  }

  export type AdminSettingsGroupByOutputType = {
    id: string
    bank_name: string
    bank_account: string
    bank_owner: string
    e_wallet: string
    _count: AdminSettingsCountAggregateOutputType | null
    _min: AdminSettingsMinAggregateOutputType | null
    _max: AdminSettingsMaxAggregateOutputType | null
  }

  type GetAdminSettingsGroupByPayload<T extends AdminSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], AdminSettingsGroupByOutputType[P]>
        }
      >
    >


  export type AdminSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bank_name?: boolean
    bank_account?: boolean
    bank_owner?: boolean
    e_wallet?: boolean
  }, ExtArgs["result"]["adminSettings"]>

  export type AdminSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bank_name?: boolean
    bank_account?: boolean
    bank_owner?: boolean
    e_wallet?: boolean
  }, ExtArgs["result"]["adminSettings"]>

  export type AdminSettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bank_name?: boolean
    bank_account?: boolean
    bank_owner?: boolean
    e_wallet?: boolean
  }, ExtArgs["result"]["adminSettings"]>

  export type AdminSettingsSelectScalar = {
    id?: boolean
    bank_name?: boolean
    bank_account?: boolean
    bank_owner?: boolean
    e_wallet?: boolean
  }

  export type AdminSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "bank_name" | "bank_account" | "bank_owner" | "e_wallet", ExtArgs["result"]["adminSettings"]>

  export type $AdminSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminSettings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      bank_name: string
      bank_account: string
      bank_owner: string
      e_wallet: string
    }, ExtArgs["result"]["adminSettings"]>
    composites: {}
  }

  type AdminSettingsGetPayload<S extends boolean | null | undefined | AdminSettingsDefaultArgs> = $Result.GetResult<Prisma.$AdminSettingsPayload, S>

  type AdminSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminSettingsCountAggregateInputType | true
    }

  export interface AdminSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminSettings'], meta: { name: 'AdminSettings' } }
    /**
     * Find zero or one AdminSettings that matches the filter.
     * @param {AdminSettingsFindUniqueArgs} args - Arguments to find a AdminSettings
     * @example
     * // Get one AdminSettings
     * const adminSettings = await prisma.adminSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminSettingsFindUniqueArgs>(args: SelectSubset<T, AdminSettingsFindUniqueArgs<ExtArgs>>): Prisma__AdminSettingsClient<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AdminSettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminSettingsFindUniqueOrThrowArgs} args - Arguments to find a AdminSettings
     * @example
     * // Get one AdminSettings
     * const adminSettings = await prisma.adminSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminSettingsClient<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingsFindFirstArgs} args - Arguments to find a AdminSettings
     * @example
     * // Get one AdminSettings
     * const adminSettings = await prisma.adminSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminSettingsFindFirstArgs>(args?: SelectSubset<T, AdminSettingsFindFirstArgs<ExtArgs>>): Prisma__AdminSettingsClient<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingsFindFirstOrThrowArgs} args - Arguments to find a AdminSettings
     * @example
     * // Get one AdminSettings
     * const adminSettings = await prisma.adminSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminSettingsClient<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AdminSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminSettings
     * const adminSettings = await prisma.adminSettings.findMany()
     * 
     * // Get first 10 AdminSettings
     * const adminSettings = await prisma.adminSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminSettingsWithIdOnly = await prisma.adminSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminSettingsFindManyArgs>(args?: SelectSubset<T, AdminSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AdminSettings.
     * @param {AdminSettingsCreateArgs} args - Arguments to create a AdminSettings.
     * @example
     * // Create one AdminSettings
     * const AdminSettings = await prisma.adminSettings.create({
     *   data: {
     *     // ... data to create a AdminSettings
     *   }
     * })
     * 
     */
    create<T extends AdminSettingsCreateArgs>(args: SelectSubset<T, AdminSettingsCreateArgs<ExtArgs>>): Prisma__AdminSettingsClient<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AdminSettings.
     * @param {AdminSettingsCreateManyArgs} args - Arguments to create many AdminSettings.
     * @example
     * // Create many AdminSettings
     * const adminSettings = await prisma.adminSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminSettingsCreateManyArgs>(args?: SelectSubset<T, AdminSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdminSettings and returns the data saved in the database.
     * @param {AdminSettingsCreateManyAndReturnArgs} args - Arguments to create many AdminSettings.
     * @example
     * // Create many AdminSettings
     * const adminSettings = await prisma.adminSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdminSettings and only return the `id`
     * const adminSettingsWithIdOnly = await prisma.adminSettings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AdminSettings.
     * @param {AdminSettingsDeleteArgs} args - Arguments to delete one AdminSettings.
     * @example
     * // Delete one AdminSettings
     * const AdminSettings = await prisma.adminSettings.delete({
     *   where: {
     *     // ... filter to delete one AdminSettings
     *   }
     * })
     * 
     */
    delete<T extends AdminSettingsDeleteArgs>(args: SelectSubset<T, AdminSettingsDeleteArgs<ExtArgs>>): Prisma__AdminSettingsClient<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AdminSettings.
     * @param {AdminSettingsUpdateArgs} args - Arguments to update one AdminSettings.
     * @example
     * // Update one AdminSettings
     * const adminSettings = await prisma.adminSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminSettingsUpdateArgs>(args: SelectSubset<T, AdminSettingsUpdateArgs<ExtArgs>>): Prisma__AdminSettingsClient<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AdminSettings.
     * @param {AdminSettingsDeleteManyArgs} args - Arguments to filter AdminSettings to delete.
     * @example
     * // Delete a few AdminSettings
     * const { count } = await prisma.adminSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminSettingsDeleteManyArgs>(args?: SelectSubset<T, AdminSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminSettings
     * const adminSettings = await prisma.adminSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminSettingsUpdateManyArgs>(args: SelectSubset<T, AdminSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminSettings and returns the data updated in the database.
     * @param {AdminSettingsUpdateManyAndReturnArgs} args - Arguments to update many AdminSettings.
     * @example
     * // Update many AdminSettings
     * const adminSettings = await prisma.adminSettings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AdminSettings and only return the `id`
     * const adminSettingsWithIdOnly = await prisma.adminSettings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminSettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminSettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AdminSettings.
     * @param {AdminSettingsUpsertArgs} args - Arguments to update or create a AdminSettings.
     * @example
     * // Update or create a AdminSettings
     * const adminSettings = await prisma.adminSettings.upsert({
     *   create: {
     *     // ... data to create a AdminSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminSettings we want to update
     *   }
     * })
     */
    upsert<T extends AdminSettingsUpsertArgs>(args: SelectSubset<T, AdminSettingsUpsertArgs<ExtArgs>>): Prisma__AdminSettingsClient<$Result.GetResult<Prisma.$AdminSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AdminSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingsCountArgs} args - Arguments to filter AdminSettings to count.
     * @example
     * // Count the number of AdminSettings
     * const count = await prisma.adminSettings.count({
     *   where: {
     *     // ... the filter for the AdminSettings we want to count
     *   }
     * })
    **/
    count<T extends AdminSettingsCountArgs>(
      args?: Subset<T, AdminSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminSettingsAggregateArgs>(args: Subset<T, AdminSettingsAggregateArgs>): Prisma.PrismaPromise<GetAdminSettingsAggregateType<T>>

    /**
     * Group by AdminSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminSettingsGroupByArgs['orderBy'] }
        : { orderBy?: AdminSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminSettings model
   */
  readonly fields: AdminSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AdminSettings model
   */
  interface AdminSettingsFieldRefs {
    readonly id: FieldRef<"AdminSettings", 'String'>
    readonly bank_name: FieldRef<"AdminSettings", 'String'>
    readonly bank_account: FieldRef<"AdminSettings", 'String'>
    readonly bank_owner: FieldRef<"AdminSettings", 'String'>
    readonly e_wallet: FieldRef<"AdminSettings", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AdminSettings findUnique
   */
  export type AdminSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * Filter, which AdminSettings to fetch.
     */
    where: AdminSettingsWhereUniqueInput
  }

  /**
   * AdminSettings findUniqueOrThrow
   */
  export type AdminSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * Filter, which AdminSettings to fetch.
     */
    where: AdminSettingsWhereUniqueInput
  }

  /**
   * AdminSettings findFirst
   */
  export type AdminSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * Filter, which AdminSettings to fetch.
     */
    where?: AdminSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminSettings to fetch.
     */
    orderBy?: AdminSettingsOrderByWithRelationInput | AdminSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminSettings.
     */
    cursor?: AdminSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminSettings.
     */
    distinct?: AdminSettingsScalarFieldEnum | AdminSettingsScalarFieldEnum[]
  }

  /**
   * AdminSettings findFirstOrThrow
   */
  export type AdminSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * Filter, which AdminSettings to fetch.
     */
    where?: AdminSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminSettings to fetch.
     */
    orderBy?: AdminSettingsOrderByWithRelationInput | AdminSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminSettings.
     */
    cursor?: AdminSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminSettings.
     */
    distinct?: AdminSettingsScalarFieldEnum | AdminSettingsScalarFieldEnum[]
  }

  /**
   * AdminSettings findMany
   */
  export type AdminSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * Filter, which AdminSettings to fetch.
     */
    where?: AdminSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminSettings to fetch.
     */
    orderBy?: AdminSettingsOrderByWithRelationInput | AdminSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminSettings.
     */
    cursor?: AdminSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminSettings.
     */
    skip?: number
    distinct?: AdminSettingsScalarFieldEnum | AdminSettingsScalarFieldEnum[]
  }

  /**
   * AdminSettings create
   */
  export type AdminSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * The data needed to create a AdminSettings.
     */
    data: XOR<AdminSettingsCreateInput, AdminSettingsUncheckedCreateInput>
  }

  /**
   * AdminSettings createMany
   */
  export type AdminSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminSettings.
     */
    data: AdminSettingsCreateManyInput | AdminSettingsCreateManyInput[]
  }

  /**
   * AdminSettings createManyAndReturn
   */
  export type AdminSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * The data used to create many AdminSettings.
     */
    data: AdminSettingsCreateManyInput | AdminSettingsCreateManyInput[]
  }

  /**
   * AdminSettings update
   */
  export type AdminSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * The data needed to update a AdminSettings.
     */
    data: XOR<AdminSettingsUpdateInput, AdminSettingsUncheckedUpdateInput>
    /**
     * Choose, which AdminSettings to update.
     */
    where: AdminSettingsWhereUniqueInput
  }

  /**
   * AdminSettings updateMany
   */
  export type AdminSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminSettings.
     */
    data: XOR<AdminSettingsUpdateManyMutationInput, AdminSettingsUncheckedUpdateManyInput>
    /**
     * Filter which AdminSettings to update
     */
    where?: AdminSettingsWhereInput
    /**
     * Limit how many AdminSettings to update.
     */
    limit?: number
  }

  /**
   * AdminSettings updateManyAndReturn
   */
  export type AdminSettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * The data used to update AdminSettings.
     */
    data: XOR<AdminSettingsUpdateManyMutationInput, AdminSettingsUncheckedUpdateManyInput>
    /**
     * Filter which AdminSettings to update
     */
    where?: AdminSettingsWhereInput
    /**
     * Limit how many AdminSettings to update.
     */
    limit?: number
  }

  /**
   * AdminSettings upsert
   */
  export type AdminSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * The filter to search for the AdminSettings to update in case it exists.
     */
    where: AdminSettingsWhereUniqueInput
    /**
     * In case the AdminSettings found by the `where` argument doesn't exist, create a new AdminSettings with this data.
     */
    create: XOR<AdminSettingsCreateInput, AdminSettingsUncheckedCreateInput>
    /**
     * In case the AdminSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminSettingsUpdateInput, AdminSettingsUncheckedUpdateInput>
  }

  /**
   * AdminSettings delete
   */
  export type AdminSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
    /**
     * Filter which AdminSettings to delete.
     */
    where: AdminSettingsWhereUniqueInput
  }

  /**
   * AdminSettings deleteMany
   */
  export type AdminSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminSettings to delete
     */
    where?: AdminSettingsWhereInput
    /**
     * Limit how many AdminSettings to delete.
     */
    limit?: number
  }

  /**
   * AdminSettings without action
   */
  export type AdminSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSettings
     */
    select?: AdminSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSettings
     */
    omit?: AdminSettingsOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    balance: 'balance',
    rating: 'rating',
    completedJobs: 'completedJobs',
    createdAt: 'createdAt',
    isAdmin: 'isAdmin',
    telegramChatId: 'telegramChatId',
    telegramLinkCode: 'telegramLinkCode'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    clientId: 'clientId',
    workerId: 'workerId',
    title: 'title',
    description: 'description',
    category: 'category',
    deadline: 'deadline',
    budget: 'budget',
    status: 'status',
    createdAt: 'createdAt',
    completedAt: 'completedAt',
    clientRating: 'clientRating',
    workerRating: 'workerRating',
    escrowHeld: 'escrowHeld',
    submissionNote: 'submissionNote',
    submissionUrl: 'submissionUrl',
    takenAt: 'takenAt',
    disputeReason: 'disputeReason',
    disputedAt: 'disputedAt'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const TaskMessageScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    senderId: 'senderId',
    content: 'content',
    createdAt: 'createdAt'
  };

  export type TaskMessageScalarFieldEnum = (typeof TaskMessageScalarFieldEnum)[keyof typeof TaskMessageScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    amount: 'amount',
    taskId: 'taskId',
    createdAt: 'createdAt',
    desc: 'desc',
    status: 'status',
    proofUrl: 'proofUrl',
    note: 'note',
    rejectionReason: 'rejectionReason',
    bankDetails: 'bankDetails'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const AdminSettingsScalarFieldEnum: {
    id: 'id',
    bank_name: 'bank_name',
    bank_account: 'bank_account',
    bank_owner: 'bank_owner',
    e_wallet: 'e_wallet'
  };

  export type AdminSettingsScalarFieldEnum = (typeof AdminSettingsScalarFieldEnum)[keyof typeof AdminSettingsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    balance?: FloatFilter<"User"> | number
    rating?: FloatFilter<"User"> | number
    completedJobs?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    isAdmin?: BoolFilter<"User"> | boolean
    telegramChatId?: StringNullableFilter<"User"> | string | null
    telegramLinkCode?: StringNullableFilter<"User"> | string | null
    tasksAsClient?: TaskListRelationFilter
    tasksAsWorker?: TaskListRelationFilter
    transactions?: TransactionListRelationFilter
    taskMessages?: TaskMessageListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    balance?: SortOrder
    rating?: SortOrder
    completedJobs?: SortOrder
    createdAt?: SortOrder
    isAdmin?: SortOrder
    telegramChatId?: SortOrderInput | SortOrder
    telegramLinkCode?: SortOrderInput | SortOrder
    tasksAsClient?: TaskOrderByRelationAggregateInput
    tasksAsWorker?: TaskOrderByRelationAggregateInput
    transactions?: TransactionOrderByRelationAggregateInput
    taskMessages?: TaskMessageOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    balance?: FloatFilter<"User"> | number
    rating?: FloatFilter<"User"> | number
    completedJobs?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    isAdmin?: BoolFilter<"User"> | boolean
    telegramChatId?: StringNullableFilter<"User"> | string | null
    telegramLinkCode?: StringNullableFilter<"User"> | string | null
    tasksAsClient?: TaskListRelationFilter
    tasksAsWorker?: TaskListRelationFilter
    transactions?: TransactionListRelationFilter
    taskMessages?: TaskMessageListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    balance?: SortOrder
    rating?: SortOrder
    completedJobs?: SortOrder
    createdAt?: SortOrder
    isAdmin?: SortOrder
    telegramChatId?: SortOrderInput | SortOrder
    telegramLinkCode?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    balance?: FloatWithAggregatesFilter<"User"> | number
    rating?: FloatWithAggregatesFilter<"User"> | number
    completedJobs?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    isAdmin?: BoolWithAggregatesFilter<"User"> | boolean
    telegramChatId?: StringNullableWithAggregatesFilter<"User"> | string | null
    telegramLinkCode?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: StringFilter<"Task"> | string
    clientId?: StringFilter<"Task"> | string
    workerId?: StringNullableFilter<"Task"> | string | null
    title?: StringFilter<"Task"> | string
    description?: StringFilter<"Task"> | string
    category?: StringFilter<"Task"> | string
    deadline?: DateTimeFilter<"Task"> | Date | string
    budget?: FloatFilter<"Task"> | number
    status?: StringFilter<"Task"> | string
    createdAt?: DateTimeFilter<"Task"> | Date | string
    completedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    clientRating?: IntNullableFilter<"Task"> | number | null
    workerRating?: IntNullableFilter<"Task"> | number | null
    escrowHeld?: BoolFilter<"Task"> | boolean
    submissionNote?: StringNullableFilter<"Task"> | string | null
    submissionUrl?: StringNullableFilter<"Task"> | string | null
    takenAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    disputeReason?: StringNullableFilter<"Task"> | string | null
    disputedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    client?: XOR<UserScalarRelationFilter, UserWhereInput>
    worker?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    messages?: TaskMessageListRelationFilter
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    clientId?: SortOrder
    workerId?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    deadline?: SortOrder
    budget?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    clientRating?: SortOrderInput | SortOrder
    workerRating?: SortOrderInput | SortOrder
    escrowHeld?: SortOrder
    submissionNote?: SortOrderInput | SortOrder
    submissionUrl?: SortOrderInput | SortOrder
    takenAt?: SortOrderInput | SortOrder
    disputeReason?: SortOrderInput | SortOrder
    disputedAt?: SortOrderInput | SortOrder
    client?: UserOrderByWithRelationInput
    worker?: UserOrderByWithRelationInput
    messages?: TaskMessageOrderByRelationAggregateInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    clientId?: StringFilter<"Task"> | string
    workerId?: StringNullableFilter<"Task"> | string | null
    title?: StringFilter<"Task"> | string
    description?: StringFilter<"Task"> | string
    category?: StringFilter<"Task"> | string
    deadline?: DateTimeFilter<"Task"> | Date | string
    budget?: FloatFilter<"Task"> | number
    status?: StringFilter<"Task"> | string
    createdAt?: DateTimeFilter<"Task"> | Date | string
    completedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    clientRating?: IntNullableFilter<"Task"> | number | null
    workerRating?: IntNullableFilter<"Task"> | number | null
    escrowHeld?: BoolFilter<"Task"> | boolean
    submissionNote?: StringNullableFilter<"Task"> | string | null
    submissionUrl?: StringNullableFilter<"Task"> | string | null
    takenAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    disputeReason?: StringNullableFilter<"Task"> | string | null
    disputedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    client?: XOR<UserScalarRelationFilter, UserWhereInput>
    worker?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    messages?: TaskMessageListRelationFilter
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    clientId?: SortOrder
    workerId?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    deadline?: SortOrder
    budget?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    clientRating?: SortOrderInput | SortOrder
    workerRating?: SortOrderInput | SortOrder
    escrowHeld?: SortOrder
    submissionNote?: SortOrderInput | SortOrder
    submissionUrl?: SortOrderInput | SortOrder
    takenAt?: SortOrderInput | SortOrder
    disputeReason?: SortOrderInput | SortOrder
    disputedAt?: SortOrderInput | SortOrder
    _count?: TaskCountOrderByAggregateInput
    _avg?: TaskAvgOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
    _sum?: TaskSumOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Task"> | string
    clientId?: StringWithAggregatesFilter<"Task"> | string
    workerId?: StringNullableWithAggregatesFilter<"Task"> | string | null
    title?: StringWithAggregatesFilter<"Task"> | string
    description?: StringWithAggregatesFilter<"Task"> | string
    category?: StringWithAggregatesFilter<"Task"> | string
    deadline?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    budget?: FloatWithAggregatesFilter<"Task"> | number
    status?: StringWithAggregatesFilter<"Task"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    clientRating?: IntNullableWithAggregatesFilter<"Task"> | number | null
    workerRating?: IntNullableWithAggregatesFilter<"Task"> | number | null
    escrowHeld?: BoolWithAggregatesFilter<"Task"> | boolean
    submissionNote?: StringNullableWithAggregatesFilter<"Task"> | string | null
    submissionUrl?: StringNullableWithAggregatesFilter<"Task"> | string | null
    takenAt?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    disputeReason?: StringNullableWithAggregatesFilter<"Task"> | string | null
    disputedAt?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
  }

  export type TaskMessageWhereInput = {
    AND?: TaskMessageWhereInput | TaskMessageWhereInput[]
    OR?: TaskMessageWhereInput[]
    NOT?: TaskMessageWhereInput | TaskMessageWhereInput[]
    id?: StringFilter<"TaskMessage"> | string
    taskId?: StringFilter<"TaskMessage"> | string
    senderId?: StringFilter<"TaskMessage"> | string
    content?: StringFilter<"TaskMessage"> | string
    createdAt?: DateTimeFilter<"TaskMessage"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TaskMessageOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    task?: TaskOrderByWithRelationInput
    sender?: UserOrderByWithRelationInput
  }

  export type TaskMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskMessageWhereInput | TaskMessageWhereInput[]
    OR?: TaskMessageWhereInput[]
    NOT?: TaskMessageWhereInput | TaskMessageWhereInput[]
    taskId?: StringFilter<"TaskMessage"> | string
    senderId?: StringFilter<"TaskMessage"> | string
    content?: StringFilter<"TaskMessage"> | string
    createdAt?: DateTimeFilter<"TaskMessage"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TaskMessageOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    _count?: TaskMessageCountOrderByAggregateInput
    _max?: TaskMessageMaxOrderByAggregateInput
    _min?: TaskMessageMinOrderByAggregateInput
  }

  export type TaskMessageScalarWhereWithAggregatesInput = {
    AND?: TaskMessageScalarWhereWithAggregatesInput | TaskMessageScalarWhereWithAggregatesInput[]
    OR?: TaskMessageScalarWhereWithAggregatesInput[]
    NOT?: TaskMessageScalarWhereWithAggregatesInput | TaskMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TaskMessage"> | string
    taskId?: StringWithAggregatesFilter<"TaskMessage"> | string
    senderId?: StringWithAggregatesFilter<"TaskMessage"> | string
    content?: StringWithAggregatesFilter<"TaskMessage"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TaskMessage"> | Date | string
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    userId?: StringFilter<"Transaction"> | string
    type?: StringFilter<"Transaction"> | string
    amount?: FloatFilter<"Transaction"> | number
    taskId?: StringNullableFilter<"Transaction"> | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    desc?: StringFilter<"Transaction"> | string
    status?: StringFilter<"Transaction"> | string
    proofUrl?: StringNullableFilter<"Transaction"> | string | null
    note?: StringNullableFilter<"Transaction"> | string | null
    rejectionReason?: StringNullableFilter<"Transaction"> | string | null
    bankDetails?: StringNullableFilter<"Transaction"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    taskId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    desc?: SortOrder
    status?: SortOrder
    proofUrl?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    bankDetails?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    userId?: StringFilter<"Transaction"> | string
    type?: StringFilter<"Transaction"> | string
    amount?: FloatFilter<"Transaction"> | number
    taskId?: StringNullableFilter<"Transaction"> | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    desc?: StringFilter<"Transaction"> | string
    status?: StringFilter<"Transaction"> | string
    proofUrl?: StringNullableFilter<"Transaction"> | string | null
    note?: StringNullableFilter<"Transaction"> | string | null
    rejectionReason?: StringNullableFilter<"Transaction"> | string | null
    bankDetails?: StringNullableFilter<"Transaction"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    taskId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    desc?: SortOrder
    status?: SortOrder
    proofUrl?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    bankDetails?: SortOrderInput | SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    userId?: StringWithAggregatesFilter<"Transaction"> | string
    type?: StringWithAggregatesFilter<"Transaction"> | string
    amount?: FloatWithAggregatesFilter<"Transaction"> | number
    taskId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    desc?: StringWithAggregatesFilter<"Transaction"> | string
    status?: StringWithAggregatesFilter<"Transaction"> | string
    proofUrl?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    note?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    rejectionReason?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    bankDetails?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
  }

  export type AdminSettingsWhereInput = {
    AND?: AdminSettingsWhereInput | AdminSettingsWhereInput[]
    OR?: AdminSettingsWhereInput[]
    NOT?: AdminSettingsWhereInput | AdminSettingsWhereInput[]
    id?: StringFilter<"AdminSettings"> | string
    bank_name?: StringFilter<"AdminSettings"> | string
    bank_account?: StringFilter<"AdminSettings"> | string
    bank_owner?: StringFilter<"AdminSettings"> | string
    e_wallet?: StringFilter<"AdminSettings"> | string
  }

  export type AdminSettingsOrderByWithRelationInput = {
    id?: SortOrder
    bank_name?: SortOrder
    bank_account?: SortOrder
    bank_owner?: SortOrder
    e_wallet?: SortOrder
  }

  export type AdminSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AdminSettingsWhereInput | AdminSettingsWhereInput[]
    OR?: AdminSettingsWhereInput[]
    NOT?: AdminSettingsWhereInput | AdminSettingsWhereInput[]
    bank_name?: StringFilter<"AdminSettings"> | string
    bank_account?: StringFilter<"AdminSettings"> | string
    bank_owner?: StringFilter<"AdminSettings"> | string
    e_wallet?: StringFilter<"AdminSettings"> | string
  }, "id">

  export type AdminSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    bank_name?: SortOrder
    bank_account?: SortOrder
    bank_owner?: SortOrder
    e_wallet?: SortOrder
    _count?: AdminSettingsCountOrderByAggregateInput
    _max?: AdminSettingsMaxOrderByAggregateInput
    _min?: AdminSettingsMinOrderByAggregateInput
  }

  export type AdminSettingsScalarWhereWithAggregatesInput = {
    AND?: AdminSettingsScalarWhereWithAggregatesInput | AdminSettingsScalarWhereWithAggregatesInput[]
    OR?: AdminSettingsScalarWhereWithAggregatesInput[]
    NOT?: AdminSettingsScalarWhereWithAggregatesInput | AdminSettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AdminSettings"> | string
    bank_name?: StringWithAggregatesFilter<"AdminSettings"> | string
    bank_account?: StringWithAggregatesFilter<"AdminSettings"> | string
    bank_owner?: StringWithAggregatesFilter<"AdminSettings"> | string
    e_wallet?: StringWithAggregatesFilter<"AdminSettings"> | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    balance?: number
    rating?: number
    completedJobs?: number
    createdAt?: Date | string
    isAdmin?: boolean
    telegramChatId?: string | null
    telegramLinkCode?: string | null
    tasksAsClient?: TaskCreateNestedManyWithoutClientInput
    tasksAsWorker?: TaskCreateNestedManyWithoutWorkerInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
    taskMessages?: TaskMessageCreateNestedManyWithoutSenderInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    balance?: number
    rating?: number
    completedJobs?: number
    createdAt?: Date | string
    isAdmin?: boolean
    telegramChatId?: string | null
    telegramLinkCode?: string | null
    tasksAsClient?: TaskUncheckedCreateNestedManyWithoutClientInput
    tasksAsWorker?: TaskUncheckedCreateNestedManyWithoutWorkerInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
    taskMessages?: TaskMessageUncheckedCreateNestedManyWithoutSenderInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    completedJobs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    telegramChatId?: NullableStringFieldUpdateOperationsInput | string | null
    telegramLinkCode?: NullableStringFieldUpdateOperationsInput | string | null
    tasksAsClient?: TaskUpdateManyWithoutClientNestedInput
    tasksAsWorker?: TaskUpdateManyWithoutWorkerNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
    taskMessages?: TaskMessageUpdateManyWithoutSenderNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    completedJobs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    telegramChatId?: NullableStringFieldUpdateOperationsInput | string | null
    telegramLinkCode?: NullableStringFieldUpdateOperationsInput | string | null
    tasksAsClient?: TaskUncheckedUpdateManyWithoutClientNestedInput
    tasksAsWorker?: TaskUncheckedUpdateManyWithoutWorkerNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
    taskMessages?: TaskMessageUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    balance?: number
    rating?: number
    completedJobs?: number
    createdAt?: Date | string
    isAdmin?: boolean
    telegramChatId?: string | null
    telegramLinkCode?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    completedJobs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    telegramChatId?: NullableStringFieldUpdateOperationsInput | string | null
    telegramLinkCode?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    completedJobs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    telegramChatId?: NullableStringFieldUpdateOperationsInput | string | null
    telegramLinkCode?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskCreateInput = {
    id?: string
    title: string
    description: string
    category: string
    deadline: Date | string
    budget: number
    status?: string
    createdAt?: Date | string
    completedAt?: Date | string | null
    clientRating?: number | null
    workerRating?: number | null
    escrowHeld?: boolean
    submissionNote?: string | null
    submissionUrl?: string | null
    takenAt?: Date | string | null
    disputeReason?: string | null
    disputedAt?: Date | string | null
    client: UserCreateNestedOneWithoutTasksAsClientInput
    worker?: UserCreateNestedOneWithoutTasksAsWorkerInput
    messages?: TaskMessageCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateInput = {
    id?: string
    clientId: string
    workerId?: string | null
    title: string
    description: string
    category: string
    deadline: Date | string
    budget: number
    status?: string
    createdAt?: Date | string
    completedAt?: Date | string | null
    clientRating?: number | null
    workerRating?: number | null
    escrowHeld?: boolean
    submissionNote?: string | null
    submissionUrl?: string | null
    takenAt?: Date | string | null
    disputeReason?: string | null
    disputedAt?: Date | string | null
    messages?: TaskMessageUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    budget?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientRating?: NullableIntFieldUpdateOperationsInput | number | null
    workerRating?: NullableIntFieldUpdateOperationsInput | number | null
    escrowHeld?: BoolFieldUpdateOperationsInput | boolean
    submissionNote?: NullableStringFieldUpdateOperationsInput | string | null
    submissionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    takenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disputeReason?: NullableStringFieldUpdateOperationsInput | string | null
    disputedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    client?: UserUpdateOneRequiredWithoutTasksAsClientNestedInput
    worker?: UserUpdateOneWithoutTasksAsWorkerNestedInput
    messages?: TaskMessageUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    workerId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    budget?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientRating?: NullableIntFieldUpdateOperationsInput | number | null
    workerRating?: NullableIntFieldUpdateOperationsInput | number | null
    escrowHeld?: BoolFieldUpdateOperationsInput | boolean
    submissionNote?: NullableStringFieldUpdateOperationsInput | string | null
    submissionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    takenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disputeReason?: NullableStringFieldUpdateOperationsInput | string | null
    disputedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    messages?: TaskMessageUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskCreateManyInput = {
    id?: string
    clientId: string
    workerId?: string | null
    title: string
    description: string
    category: string
    deadline: Date | string
    budget: number
    status?: string
    createdAt?: Date | string
    completedAt?: Date | string | null
    clientRating?: number | null
    workerRating?: number | null
    escrowHeld?: boolean
    submissionNote?: string | null
    submissionUrl?: string | null
    takenAt?: Date | string | null
    disputeReason?: string | null
    disputedAt?: Date | string | null
  }

  export type TaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    budget?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientRating?: NullableIntFieldUpdateOperationsInput | number | null
    workerRating?: NullableIntFieldUpdateOperationsInput | number | null
    escrowHeld?: BoolFieldUpdateOperationsInput | boolean
    submissionNote?: NullableStringFieldUpdateOperationsInput | string | null
    submissionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    takenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disputeReason?: NullableStringFieldUpdateOperationsInput | string | null
    disputedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    workerId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    budget?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientRating?: NullableIntFieldUpdateOperationsInput | number | null
    workerRating?: NullableIntFieldUpdateOperationsInput | number | null
    escrowHeld?: BoolFieldUpdateOperationsInput | boolean
    submissionNote?: NullableStringFieldUpdateOperationsInput | string | null
    submissionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    takenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disputeReason?: NullableStringFieldUpdateOperationsInput | string | null
    disputedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TaskMessageCreateInput = {
    id?: string
    content: string
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutMessagesInput
    sender: UserCreateNestedOneWithoutTaskMessagesInput
  }

  export type TaskMessageUncheckedCreateInput = {
    id?: string
    taskId: string
    senderId: string
    content: string
    createdAt?: Date | string
  }

  export type TaskMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutMessagesNestedInput
    sender?: UserUpdateOneRequiredWithoutTaskMessagesNestedInput
  }

  export type TaskMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskMessageCreateManyInput = {
    id?: string
    taskId: string
    senderId: string
    content: string
    createdAt?: Date | string
  }

  export type TaskMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateInput = {
    id?: string
    type: string
    amount: number
    taskId?: string | null
    createdAt?: Date | string
    desc: string
    status?: string
    proofUrl?: string | null
    note?: string | null
    rejectionReason?: string | null
    bankDetails?: string | null
    user: UserCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    amount: number
    taskId?: string | null
    createdAt?: Date | string
    desc: string
    status?: string
    proofUrl?: string | null
    note?: string | null
    rejectionReason?: string | null
    bankDetails?: string | null
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    desc?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    bankDetails?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    desc?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    bankDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransactionCreateManyInput = {
    id?: string
    userId: string
    type: string
    amount: number
    taskId?: string | null
    createdAt?: Date | string
    desc: string
    status?: string
    proofUrl?: string | null
    note?: string | null
    rejectionReason?: string | null
    bankDetails?: string | null
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    desc?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    bankDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    desc?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    bankDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AdminSettingsCreateInput = {
    id?: string
    bank_name: string
    bank_account: string
    bank_owner: string
    e_wallet: string
  }

  export type AdminSettingsUncheckedCreateInput = {
    id?: string
    bank_name: string
    bank_account: string
    bank_owner: string
    e_wallet: string
  }

  export type AdminSettingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bank_name?: StringFieldUpdateOperationsInput | string
    bank_account?: StringFieldUpdateOperationsInput | string
    bank_owner?: StringFieldUpdateOperationsInput | string
    e_wallet?: StringFieldUpdateOperationsInput | string
  }

  export type AdminSettingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bank_name?: StringFieldUpdateOperationsInput | string
    bank_account?: StringFieldUpdateOperationsInput | string
    bank_owner?: StringFieldUpdateOperationsInput | string
    e_wallet?: StringFieldUpdateOperationsInput | string
  }

  export type AdminSettingsCreateManyInput = {
    id?: string
    bank_name: string
    bank_account: string
    bank_owner: string
    e_wallet: string
  }

  export type AdminSettingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    bank_name?: StringFieldUpdateOperationsInput | string
    bank_account?: StringFieldUpdateOperationsInput | string
    bank_owner?: StringFieldUpdateOperationsInput | string
    e_wallet?: StringFieldUpdateOperationsInput | string
  }

  export type AdminSettingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bank_name?: StringFieldUpdateOperationsInput | string
    bank_account?: StringFieldUpdateOperationsInput | string
    bank_owner?: StringFieldUpdateOperationsInput | string
    e_wallet?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type TaskMessageListRelationFilter = {
    every?: TaskMessageWhereInput
    some?: TaskMessageWhereInput
    none?: TaskMessageWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskMessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    balance?: SortOrder
    rating?: SortOrder
    completedJobs?: SortOrder
    createdAt?: SortOrder
    isAdmin?: SortOrder
    telegramChatId?: SortOrder
    telegramLinkCode?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    balance?: SortOrder
    rating?: SortOrder
    completedJobs?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    balance?: SortOrder
    rating?: SortOrder
    completedJobs?: SortOrder
    createdAt?: SortOrder
    isAdmin?: SortOrder
    telegramChatId?: SortOrder
    telegramLinkCode?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    balance?: SortOrder
    rating?: SortOrder
    completedJobs?: SortOrder
    createdAt?: SortOrder
    isAdmin?: SortOrder
    telegramChatId?: SortOrder
    telegramLinkCode?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    balance?: SortOrder
    rating?: SortOrder
    completedJobs?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    workerId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    deadline?: SortOrder
    budget?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
    clientRating?: SortOrder
    workerRating?: SortOrder
    escrowHeld?: SortOrder
    submissionNote?: SortOrder
    submissionUrl?: SortOrder
    takenAt?: SortOrder
    disputeReason?: SortOrder
    disputedAt?: SortOrder
  }

  export type TaskAvgOrderByAggregateInput = {
    budget?: SortOrder
    clientRating?: SortOrder
    workerRating?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    workerId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    deadline?: SortOrder
    budget?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
    clientRating?: SortOrder
    workerRating?: SortOrder
    escrowHeld?: SortOrder
    submissionNote?: SortOrder
    submissionUrl?: SortOrder
    takenAt?: SortOrder
    disputeReason?: SortOrder
    disputedAt?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    workerId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    deadline?: SortOrder
    budget?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
    clientRating?: SortOrder
    workerRating?: SortOrder
    escrowHeld?: SortOrder
    submissionNote?: SortOrder
    submissionUrl?: SortOrder
    takenAt?: SortOrder
    disputeReason?: SortOrder
    disputedAt?: SortOrder
  }

  export type TaskSumOrderByAggregateInput = {
    budget?: SortOrder
    clientRating?: SortOrder
    workerRating?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type TaskScalarRelationFilter = {
    is?: TaskWhereInput
    isNot?: TaskWhereInput
  }

  export type TaskMessageCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskMessageMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    taskId?: SortOrder
    createdAt?: SortOrder
    desc?: SortOrder
    status?: SortOrder
    proofUrl?: SortOrder
    note?: SortOrder
    rejectionReason?: SortOrder
    bankDetails?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    taskId?: SortOrder
    createdAt?: SortOrder
    desc?: SortOrder
    status?: SortOrder
    proofUrl?: SortOrder
    note?: SortOrder
    rejectionReason?: SortOrder
    bankDetails?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    taskId?: SortOrder
    createdAt?: SortOrder
    desc?: SortOrder
    status?: SortOrder
    proofUrl?: SortOrder
    note?: SortOrder
    rejectionReason?: SortOrder
    bankDetails?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type AdminSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    bank_name?: SortOrder
    bank_account?: SortOrder
    bank_owner?: SortOrder
    e_wallet?: SortOrder
  }

  export type AdminSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    bank_name?: SortOrder
    bank_account?: SortOrder
    bank_owner?: SortOrder
    e_wallet?: SortOrder
  }

  export type AdminSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    bank_name?: SortOrder
    bank_account?: SortOrder
    bank_owner?: SortOrder
    e_wallet?: SortOrder
  }

  export type TaskCreateNestedManyWithoutClientInput = {
    create?: XOR<TaskCreateWithoutClientInput, TaskUncheckedCreateWithoutClientInput> | TaskCreateWithoutClientInput[] | TaskUncheckedCreateWithoutClientInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutClientInput | TaskCreateOrConnectWithoutClientInput[]
    createMany?: TaskCreateManyClientInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutWorkerInput = {
    create?: XOR<TaskCreateWithoutWorkerInput, TaskUncheckedCreateWithoutWorkerInput> | TaskCreateWithoutWorkerInput[] | TaskUncheckedCreateWithoutWorkerInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutWorkerInput | TaskCreateOrConnectWithoutWorkerInput[]
    createMany?: TaskCreateManyWorkerInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutUserInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TaskMessageCreateNestedManyWithoutSenderInput = {
    create?: XOR<TaskMessageCreateWithoutSenderInput, TaskMessageUncheckedCreateWithoutSenderInput> | TaskMessageCreateWithoutSenderInput[] | TaskMessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: TaskMessageCreateOrConnectWithoutSenderInput | TaskMessageCreateOrConnectWithoutSenderInput[]
    createMany?: TaskMessageCreateManySenderInputEnvelope
    connect?: TaskMessageWhereUniqueInput | TaskMessageWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<TaskCreateWithoutClientInput, TaskUncheckedCreateWithoutClientInput> | TaskCreateWithoutClientInput[] | TaskUncheckedCreateWithoutClientInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutClientInput | TaskCreateOrConnectWithoutClientInput[]
    createMany?: TaskCreateManyClientInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutWorkerInput = {
    create?: XOR<TaskCreateWithoutWorkerInput, TaskUncheckedCreateWithoutWorkerInput> | TaskCreateWithoutWorkerInput[] | TaskUncheckedCreateWithoutWorkerInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutWorkerInput | TaskCreateOrConnectWithoutWorkerInput[]
    createMany?: TaskCreateManyWorkerInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TaskMessageUncheckedCreateNestedManyWithoutSenderInput = {
    create?: XOR<TaskMessageCreateWithoutSenderInput, TaskMessageUncheckedCreateWithoutSenderInput> | TaskMessageCreateWithoutSenderInput[] | TaskMessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: TaskMessageCreateOrConnectWithoutSenderInput | TaskMessageCreateOrConnectWithoutSenderInput[]
    createMany?: TaskMessageCreateManySenderInputEnvelope
    connect?: TaskMessageWhereUniqueInput | TaskMessageWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type TaskUpdateManyWithoutClientNestedInput = {
    create?: XOR<TaskCreateWithoutClientInput, TaskUncheckedCreateWithoutClientInput> | TaskCreateWithoutClientInput[] | TaskUncheckedCreateWithoutClientInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutClientInput | TaskCreateOrConnectWithoutClientInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutClientInput | TaskUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: TaskCreateManyClientInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutClientInput | TaskUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutClientInput | TaskUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutWorkerNestedInput = {
    create?: XOR<TaskCreateWithoutWorkerInput, TaskUncheckedCreateWithoutWorkerInput> | TaskCreateWithoutWorkerInput[] | TaskUncheckedCreateWithoutWorkerInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutWorkerInput | TaskCreateOrConnectWithoutWorkerInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutWorkerInput | TaskUpsertWithWhereUniqueWithoutWorkerInput[]
    createMany?: TaskCreateManyWorkerInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutWorkerInput | TaskUpdateWithWhereUniqueWithoutWorkerInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutWorkerInput | TaskUpdateManyWithWhereWithoutWorkerInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutUserNestedInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutUserInput | TransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutUserInput | TransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutUserInput | TransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TaskMessageUpdateManyWithoutSenderNestedInput = {
    create?: XOR<TaskMessageCreateWithoutSenderInput, TaskMessageUncheckedCreateWithoutSenderInput> | TaskMessageCreateWithoutSenderInput[] | TaskMessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: TaskMessageCreateOrConnectWithoutSenderInput | TaskMessageCreateOrConnectWithoutSenderInput[]
    upsert?: TaskMessageUpsertWithWhereUniqueWithoutSenderInput | TaskMessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: TaskMessageCreateManySenderInputEnvelope
    set?: TaskMessageWhereUniqueInput | TaskMessageWhereUniqueInput[]
    disconnect?: TaskMessageWhereUniqueInput | TaskMessageWhereUniqueInput[]
    delete?: TaskMessageWhereUniqueInput | TaskMessageWhereUniqueInput[]
    connect?: TaskMessageWhereUniqueInput | TaskMessageWhereUniqueInput[]
    update?: TaskMessageUpdateWithWhereUniqueWithoutSenderInput | TaskMessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: TaskMessageUpdateManyWithWhereWithoutSenderInput | TaskMessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: TaskMessageScalarWhereInput | TaskMessageScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<TaskCreateWithoutClientInput, TaskUncheckedCreateWithoutClientInput> | TaskCreateWithoutClientInput[] | TaskUncheckedCreateWithoutClientInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutClientInput | TaskCreateOrConnectWithoutClientInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutClientInput | TaskUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: TaskCreateManyClientInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutClientInput | TaskUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutClientInput | TaskUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutWorkerNestedInput = {
    create?: XOR<TaskCreateWithoutWorkerInput, TaskUncheckedCreateWithoutWorkerInput> | TaskCreateWithoutWorkerInput[] | TaskUncheckedCreateWithoutWorkerInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutWorkerInput | TaskCreateOrConnectWithoutWorkerInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutWorkerInput | TaskUpsertWithWhereUniqueWithoutWorkerInput[]
    createMany?: TaskCreateManyWorkerInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutWorkerInput | TaskUpdateWithWhereUniqueWithoutWorkerInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutWorkerInput | TaskUpdateManyWithWhereWithoutWorkerInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutUserInput | TransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutUserInput | TransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutUserInput | TransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TaskMessageUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: XOR<TaskMessageCreateWithoutSenderInput, TaskMessageUncheckedCreateWithoutSenderInput> | TaskMessageCreateWithoutSenderInput[] | TaskMessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: TaskMessageCreateOrConnectWithoutSenderInput | TaskMessageCreateOrConnectWithoutSenderInput[]
    upsert?: TaskMessageUpsertWithWhereUniqueWithoutSenderInput | TaskMessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: TaskMessageCreateManySenderInputEnvelope
    set?: TaskMessageWhereUniqueInput | TaskMessageWhereUniqueInput[]
    disconnect?: TaskMessageWhereUniqueInput | TaskMessageWhereUniqueInput[]
    delete?: TaskMessageWhereUniqueInput | TaskMessageWhereUniqueInput[]
    connect?: TaskMessageWhereUniqueInput | TaskMessageWhereUniqueInput[]
    update?: TaskMessageUpdateWithWhereUniqueWithoutSenderInput | TaskMessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: TaskMessageUpdateManyWithWhereWithoutSenderInput | TaskMessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: TaskMessageScalarWhereInput | TaskMessageScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTasksAsClientInput = {
    create?: XOR<UserCreateWithoutTasksAsClientInput, UserUncheckedCreateWithoutTasksAsClientInput>
    connectOrCreate?: UserCreateOrConnectWithoutTasksAsClientInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTasksAsWorkerInput = {
    create?: XOR<UserCreateWithoutTasksAsWorkerInput, UserUncheckedCreateWithoutTasksAsWorkerInput>
    connectOrCreate?: UserCreateOrConnectWithoutTasksAsWorkerInput
    connect?: UserWhereUniqueInput
  }

  export type TaskMessageCreateNestedManyWithoutTaskInput = {
    create?: XOR<TaskMessageCreateWithoutTaskInput, TaskMessageUncheckedCreateWithoutTaskInput> | TaskMessageCreateWithoutTaskInput[] | TaskMessageUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskMessageCreateOrConnectWithoutTaskInput | TaskMessageCreateOrConnectWithoutTaskInput[]
    createMany?: TaskMessageCreateManyTaskInputEnvelope
    connect?: TaskMessageWhereUniqueInput | TaskMessageWhereUniqueInput[]
  }

  export type TaskMessageUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<TaskMessageCreateWithoutTaskInput, TaskMessageUncheckedCreateWithoutTaskInput> | TaskMessageCreateWithoutTaskInput[] | TaskMessageUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskMessageCreateOrConnectWithoutTaskInput | TaskMessageCreateOrConnectWithoutTaskInput[]
    createMany?: TaskMessageCreateManyTaskInputEnvelope
    connect?: TaskMessageWhereUniqueInput | TaskMessageWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutTasksAsClientNestedInput = {
    create?: XOR<UserCreateWithoutTasksAsClientInput, UserUncheckedCreateWithoutTasksAsClientInput>
    connectOrCreate?: UserCreateOrConnectWithoutTasksAsClientInput
    upsert?: UserUpsertWithoutTasksAsClientInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTasksAsClientInput, UserUpdateWithoutTasksAsClientInput>, UserUncheckedUpdateWithoutTasksAsClientInput>
  }

  export type UserUpdateOneWithoutTasksAsWorkerNestedInput = {
    create?: XOR<UserCreateWithoutTasksAsWorkerInput, UserUncheckedCreateWithoutTasksAsWorkerInput>
    connectOrCreate?: UserCreateOrConnectWithoutTasksAsWorkerInput
    upsert?: UserUpsertWithoutTasksAsWorkerInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTasksAsWorkerInput, UserUpdateWithoutTasksAsWorkerInput>, UserUncheckedUpdateWithoutTasksAsWorkerInput>
  }

  export type TaskMessageUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TaskMessageCreateWithoutTaskInput, TaskMessageUncheckedCreateWithoutTaskInput> | TaskMessageCreateWithoutTaskInput[] | TaskMessageUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskMessageCreateOrConnectWithoutTaskInput | TaskMessageCreateOrConnectWithoutTaskInput[]
    upsert?: TaskMessageUpsertWithWhereUniqueWithoutTaskInput | TaskMessageUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TaskMessageCreateManyTaskInputEnvelope
    set?: TaskMessageWhereUniqueInput | TaskMessageWhereUniqueInput[]
    disconnect?: TaskMessageWhereUniqueInput | TaskMessageWhereUniqueInput[]
    delete?: TaskMessageWhereUniqueInput | TaskMessageWhereUniqueInput[]
    connect?: TaskMessageWhereUniqueInput | TaskMessageWhereUniqueInput[]
    update?: TaskMessageUpdateWithWhereUniqueWithoutTaskInput | TaskMessageUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TaskMessageUpdateManyWithWhereWithoutTaskInput | TaskMessageUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TaskMessageScalarWhereInput | TaskMessageScalarWhereInput[]
  }

  export type TaskMessageUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TaskMessageCreateWithoutTaskInput, TaskMessageUncheckedCreateWithoutTaskInput> | TaskMessageCreateWithoutTaskInput[] | TaskMessageUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskMessageCreateOrConnectWithoutTaskInput | TaskMessageCreateOrConnectWithoutTaskInput[]
    upsert?: TaskMessageUpsertWithWhereUniqueWithoutTaskInput | TaskMessageUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TaskMessageCreateManyTaskInputEnvelope
    set?: TaskMessageWhereUniqueInput | TaskMessageWhereUniqueInput[]
    disconnect?: TaskMessageWhereUniqueInput | TaskMessageWhereUniqueInput[]
    delete?: TaskMessageWhereUniqueInput | TaskMessageWhereUniqueInput[]
    connect?: TaskMessageWhereUniqueInput | TaskMessageWhereUniqueInput[]
    update?: TaskMessageUpdateWithWhereUniqueWithoutTaskInput | TaskMessageUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TaskMessageUpdateManyWithWhereWithoutTaskInput | TaskMessageUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TaskMessageScalarWhereInput | TaskMessageScalarWhereInput[]
  }

  export type TaskCreateNestedOneWithoutMessagesInput = {
    create?: XOR<TaskCreateWithoutMessagesInput, TaskUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: TaskCreateOrConnectWithoutMessagesInput
    connect?: TaskWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTaskMessagesInput = {
    create?: XOR<UserCreateWithoutTaskMessagesInput, UserUncheckedCreateWithoutTaskMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutTaskMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type TaskUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<TaskCreateWithoutMessagesInput, TaskUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: TaskCreateOrConnectWithoutMessagesInput
    upsert?: TaskUpsertWithoutMessagesInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutMessagesInput, TaskUpdateWithoutMessagesInput>, TaskUncheckedUpdateWithoutMessagesInput>
  }

  export type UserUpdateOneRequiredWithoutTaskMessagesNestedInput = {
    create?: XOR<UserCreateWithoutTaskMessagesInput, UserUncheckedCreateWithoutTaskMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutTaskMessagesInput
    upsert?: UserUpsertWithoutTaskMessagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTaskMessagesInput, UserUpdateWithoutTaskMessagesInput>, UserUncheckedUpdateWithoutTaskMessagesInput>
  }

  export type UserCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    upsert?: UserUpsertWithoutTransactionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTransactionsInput, UserUpdateWithoutTransactionsInput>, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type TaskCreateWithoutClientInput = {
    id?: string
    title: string
    description: string
    category: string
    deadline: Date | string
    budget: number
    status?: string
    createdAt?: Date | string
    completedAt?: Date | string | null
    clientRating?: number | null
    workerRating?: number | null
    escrowHeld?: boolean
    submissionNote?: string | null
    submissionUrl?: string | null
    takenAt?: Date | string | null
    disputeReason?: string | null
    disputedAt?: Date | string | null
    worker?: UserCreateNestedOneWithoutTasksAsWorkerInput
    messages?: TaskMessageCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutClientInput = {
    id?: string
    workerId?: string | null
    title: string
    description: string
    category: string
    deadline: Date | string
    budget: number
    status?: string
    createdAt?: Date | string
    completedAt?: Date | string | null
    clientRating?: number | null
    workerRating?: number | null
    escrowHeld?: boolean
    submissionNote?: string | null
    submissionUrl?: string | null
    takenAt?: Date | string | null
    disputeReason?: string | null
    disputedAt?: Date | string | null
    messages?: TaskMessageUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutClientInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutClientInput, TaskUncheckedCreateWithoutClientInput>
  }

  export type TaskCreateManyClientInputEnvelope = {
    data: TaskCreateManyClientInput | TaskCreateManyClientInput[]
  }

  export type TaskCreateWithoutWorkerInput = {
    id?: string
    title: string
    description: string
    category: string
    deadline: Date | string
    budget: number
    status?: string
    createdAt?: Date | string
    completedAt?: Date | string | null
    clientRating?: number | null
    workerRating?: number | null
    escrowHeld?: boolean
    submissionNote?: string | null
    submissionUrl?: string | null
    takenAt?: Date | string | null
    disputeReason?: string | null
    disputedAt?: Date | string | null
    client: UserCreateNestedOneWithoutTasksAsClientInput
    messages?: TaskMessageCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutWorkerInput = {
    id?: string
    clientId: string
    title: string
    description: string
    category: string
    deadline: Date | string
    budget: number
    status?: string
    createdAt?: Date | string
    completedAt?: Date | string | null
    clientRating?: number | null
    workerRating?: number | null
    escrowHeld?: boolean
    submissionNote?: string | null
    submissionUrl?: string | null
    takenAt?: Date | string | null
    disputeReason?: string | null
    disputedAt?: Date | string | null
    messages?: TaskMessageUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutWorkerInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutWorkerInput, TaskUncheckedCreateWithoutWorkerInput>
  }

  export type TaskCreateManyWorkerInputEnvelope = {
    data: TaskCreateManyWorkerInput | TaskCreateManyWorkerInput[]
  }

  export type TransactionCreateWithoutUserInput = {
    id?: string
    type: string
    amount: number
    taskId?: string | null
    createdAt?: Date | string
    desc: string
    status?: string
    proofUrl?: string | null
    note?: string | null
    rejectionReason?: string | null
    bankDetails?: string | null
  }

  export type TransactionUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    amount: number
    taskId?: string | null
    createdAt?: Date | string
    desc: string
    status?: string
    proofUrl?: string | null
    note?: string | null
    rejectionReason?: string | null
    bankDetails?: string | null
  }

  export type TransactionCreateOrConnectWithoutUserInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput>
  }

  export type TransactionCreateManyUserInputEnvelope = {
    data: TransactionCreateManyUserInput | TransactionCreateManyUserInput[]
  }

  export type TaskMessageCreateWithoutSenderInput = {
    id?: string
    content: string
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutMessagesInput
  }

  export type TaskMessageUncheckedCreateWithoutSenderInput = {
    id?: string
    taskId: string
    content: string
    createdAt?: Date | string
  }

  export type TaskMessageCreateOrConnectWithoutSenderInput = {
    where: TaskMessageWhereUniqueInput
    create: XOR<TaskMessageCreateWithoutSenderInput, TaskMessageUncheckedCreateWithoutSenderInput>
  }

  export type TaskMessageCreateManySenderInputEnvelope = {
    data: TaskMessageCreateManySenderInput | TaskMessageCreateManySenderInput[]
  }

  export type TaskUpsertWithWhereUniqueWithoutClientInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutClientInput, TaskUncheckedUpdateWithoutClientInput>
    create: XOR<TaskCreateWithoutClientInput, TaskUncheckedCreateWithoutClientInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutClientInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutClientInput, TaskUncheckedUpdateWithoutClientInput>
  }

  export type TaskUpdateManyWithWhereWithoutClientInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutClientInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: StringFilter<"Task"> | string
    clientId?: StringFilter<"Task"> | string
    workerId?: StringNullableFilter<"Task"> | string | null
    title?: StringFilter<"Task"> | string
    description?: StringFilter<"Task"> | string
    category?: StringFilter<"Task"> | string
    deadline?: DateTimeFilter<"Task"> | Date | string
    budget?: FloatFilter<"Task"> | number
    status?: StringFilter<"Task"> | string
    createdAt?: DateTimeFilter<"Task"> | Date | string
    completedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    clientRating?: IntNullableFilter<"Task"> | number | null
    workerRating?: IntNullableFilter<"Task"> | number | null
    escrowHeld?: BoolFilter<"Task"> | boolean
    submissionNote?: StringNullableFilter<"Task"> | string | null
    submissionUrl?: StringNullableFilter<"Task"> | string | null
    takenAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    disputeReason?: StringNullableFilter<"Task"> | string | null
    disputedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
  }

  export type TaskUpsertWithWhereUniqueWithoutWorkerInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutWorkerInput, TaskUncheckedUpdateWithoutWorkerInput>
    create: XOR<TaskCreateWithoutWorkerInput, TaskUncheckedCreateWithoutWorkerInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutWorkerInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutWorkerInput, TaskUncheckedUpdateWithoutWorkerInput>
  }

  export type TaskUpdateManyWithWhereWithoutWorkerInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutWorkerInput>
  }

  export type TransactionUpsertWithWhereUniqueWithoutUserInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutUserInput, TransactionUncheckedUpdateWithoutUserInput>
    create: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutUserInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutUserInput, TransactionUncheckedUpdateWithoutUserInput>
  }

  export type TransactionUpdateManyWithWhereWithoutUserInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutUserInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: StringFilter<"Transaction"> | string
    userId?: StringFilter<"Transaction"> | string
    type?: StringFilter<"Transaction"> | string
    amount?: FloatFilter<"Transaction"> | number
    taskId?: StringNullableFilter<"Transaction"> | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    desc?: StringFilter<"Transaction"> | string
    status?: StringFilter<"Transaction"> | string
    proofUrl?: StringNullableFilter<"Transaction"> | string | null
    note?: StringNullableFilter<"Transaction"> | string | null
    rejectionReason?: StringNullableFilter<"Transaction"> | string | null
    bankDetails?: StringNullableFilter<"Transaction"> | string | null
  }

  export type TaskMessageUpsertWithWhereUniqueWithoutSenderInput = {
    where: TaskMessageWhereUniqueInput
    update: XOR<TaskMessageUpdateWithoutSenderInput, TaskMessageUncheckedUpdateWithoutSenderInput>
    create: XOR<TaskMessageCreateWithoutSenderInput, TaskMessageUncheckedCreateWithoutSenderInput>
  }

  export type TaskMessageUpdateWithWhereUniqueWithoutSenderInput = {
    where: TaskMessageWhereUniqueInput
    data: XOR<TaskMessageUpdateWithoutSenderInput, TaskMessageUncheckedUpdateWithoutSenderInput>
  }

  export type TaskMessageUpdateManyWithWhereWithoutSenderInput = {
    where: TaskMessageScalarWhereInput
    data: XOR<TaskMessageUpdateManyMutationInput, TaskMessageUncheckedUpdateManyWithoutSenderInput>
  }

  export type TaskMessageScalarWhereInput = {
    AND?: TaskMessageScalarWhereInput | TaskMessageScalarWhereInput[]
    OR?: TaskMessageScalarWhereInput[]
    NOT?: TaskMessageScalarWhereInput | TaskMessageScalarWhereInput[]
    id?: StringFilter<"TaskMessage"> | string
    taskId?: StringFilter<"TaskMessage"> | string
    senderId?: StringFilter<"TaskMessage"> | string
    content?: StringFilter<"TaskMessage"> | string
    createdAt?: DateTimeFilter<"TaskMessage"> | Date | string
  }

  export type UserCreateWithoutTasksAsClientInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    balance?: number
    rating?: number
    completedJobs?: number
    createdAt?: Date | string
    isAdmin?: boolean
    telegramChatId?: string | null
    telegramLinkCode?: string | null
    tasksAsWorker?: TaskCreateNestedManyWithoutWorkerInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
    taskMessages?: TaskMessageCreateNestedManyWithoutSenderInput
  }

  export type UserUncheckedCreateWithoutTasksAsClientInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    balance?: number
    rating?: number
    completedJobs?: number
    createdAt?: Date | string
    isAdmin?: boolean
    telegramChatId?: string | null
    telegramLinkCode?: string | null
    tasksAsWorker?: TaskUncheckedCreateNestedManyWithoutWorkerInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
    taskMessages?: TaskMessageUncheckedCreateNestedManyWithoutSenderInput
  }

  export type UserCreateOrConnectWithoutTasksAsClientInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTasksAsClientInput, UserUncheckedCreateWithoutTasksAsClientInput>
  }

  export type UserCreateWithoutTasksAsWorkerInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    balance?: number
    rating?: number
    completedJobs?: number
    createdAt?: Date | string
    isAdmin?: boolean
    telegramChatId?: string | null
    telegramLinkCode?: string | null
    tasksAsClient?: TaskCreateNestedManyWithoutClientInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
    taskMessages?: TaskMessageCreateNestedManyWithoutSenderInput
  }

  export type UserUncheckedCreateWithoutTasksAsWorkerInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    balance?: number
    rating?: number
    completedJobs?: number
    createdAt?: Date | string
    isAdmin?: boolean
    telegramChatId?: string | null
    telegramLinkCode?: string | null
    tasksAsClient?: TaskUncheckedCreateNestedManyWithoutClientInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
    taskMessages?: TaskMessageUncheckedCreateNestedManyWithoutSenderInput
  }

  export type UserCreateOrConnectWithoutTasksAsWorkerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTasksAsWorkerInput, UserUncheckedCreateWithoutTasksAsWorkerInput>
  }

  export type TaskMessageCreateWithoutTaskInput = {
    id?: string
    content: string
    createdAt?: Date | string
    sender: UserCreateNestedOneWithoutTaskMessagesInput
  }

  export type TaskMessageUncheckedCreateWithoutTaskInput = {
    id?: string
    senderId: string
    content: string
    createdAt?: Date | string
  }

  export type TaskMessageCreateOrConnectWithoutTaskInput = {
    where: TaskMessageWhereUniqueInput
    create: XOR<TaskMessageCreateWithoutTaskInput, TaskMessageUncheckedCreateWithoutTaskInput>
  }

  export type TaskMessageCreateManyTaskInputEnvelope = {
    data: TaskMessageCreateManyTaskInput | TaskMessageCreateManyTaskInput[]
  }

  export type UserUpsertWithoutTasksAsClientInput = {
    update: XOR<UserUpdateWithoutTasksAsClientInput, UserUncheckedUpdateWithoutTasksAsClientInput>
    create: XOR<UserCreateWithoutTasksAsClientInput, UserUncheckedCreateWithoutTasksAsClientInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTasksAsClientInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTasksAsClientInput, UserUncheckedUpdateWithoutTasksAsClientInput>
  }

  export type UserUpdateWithoutTasksAsClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    completedJobs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    telegramChatId?: NullableStringFieldUpdateOperationsInput | string | null
    telegramLinkCode?: NullableStringFieldUpdateOperationsInput | string | null
    tasksAsWorker?: TaskUpdateManyWithoutWorkerNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
    taskMessages?: TaskMessageUpdateManyWithoutSenderNestedInput
  }

  export type UserUncheckedUpdateWithoutTasksAsClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    completedJobs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    telegramChatId?: NullableStringFieldUpdateOperationsInput | string | null
    telegramLinkCode?: NullableStringFieldUpdateOperationsInput | string | null
    tasksAsWorker?: TaskUncheckedUpdateManyWithoutWorkerNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
    taskMessages?: TaskMessageUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type UserUpsertWithoutTasksAsWorkerInput = {
    update: XOR<UserUpdateWithoutTasksAsWorkerInput, UserUncheckedUpdateWithoutTasksAsWorkerInput>
    create: XOR<UserCreateWithoutTasksAsWorkerInput, UserUncheckedCreateWithoutTasksAsWorkerInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTasksAsWorkerInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTasksAsWorkerInput, UserUncheckedUpdateWithoutTasksAsWorkerInput>
  }

  export type UserUpdateWithoutTasksAsWorkerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    completedJobs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    telegramChatId?: NullableStringFieldUpdateOperationsInput | string | null
    telegramLinkCode?: NullableStringFieldUpdateOperationsInput | string | null
    tasksAsClient?: TaskUpdateManyWithoutClientNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
    taskMessages?: TaskMessageUpdateManyWithoutSenderNestedInput
  }

  export type UserUncheckedUpdateWithoutTasksAsWorkerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    completedJobs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    telegramChatId?: NullableStringFieldUpdateOperationsInput | string | null
    telegramLinkCode?: NullableStringFieldUpdateOperationsInput | string | null
    tasksAsClient?: TaskUncheckedUpdateManyWithoutClientNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
    taskMessages?: TaskMessageUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type TaskMessageUpsertWithWhereUniqueWithoutTaskInput = {
    where: TaskMessageWhereUniqueInput
    update: XOR<TaskMessageUpdateWithoutTaskInput, TaskMessageUncheckedUpdateWithoutTaskInput>
    create: XOR<TaskMessageCreateWithoutTaskInput, TaskMessageUncheckedCreateWithoutTaskInput>
  }

  export type TaskMessageUpdateWithWhereUniqueWithoutTaskInput = {
    where: TaskMessageWhereUniqueInput
    data: XOR<TaskMessageUpdateWithoutTaskInput, TaskMessageUncheckedUpdateWithoutTaskInput>
  }

  export type TaskMessageUpdateManyWithWhereWithoutTaskInput = {
    where: TaskMessageScalarWhereInput
    data: XOR<TaskMessageUpdateManyMutationInput, TaskMessageUncheckedUpdateManyWithoutTaskInput>
  }

  export type TaskCreateWithoutMessagesInput = {
    id?: string
    title: string
    description: string
    category: string
    deadline: Date | string
    budget: number
    status?: string
    createdAt?: Date | string
    completedAt?: Date | string | null
    clientRating?: number | null
    workerRating?: number | null
    escrowHeld?: boolean
    submissionNote?: string | null
    submissionUrl?: string | null
    takenAt?: Date | string | null
    disputeReason?: string | null
    disputedAt?: Date | string | null
    client: UserCreateNestedOneWithoutTasksAsClientInput
    worker?: UserCreateNestedOneWithoutTasksAsWorkerInput
  }

  export type TaskUncheckedCreateWithoutMessagesInput = {
    id?: string
    clientId: string
    workerId?: string | null
    title: string
    description: string
    category: string
    deadline: Date | string
    budget: number
    status?: string
    createdAt?: Date | string
    completedAt?: Date | string | null
    clientRating?: number | null
    workerRating?: number | null
    escrowHeld?: boolean
    submissionNote?: string | null
    submissionUrl?: string | null
    takenAt?: Date | string | null
    disputeReason?: string | null
    disputedAt?: Date | string | null
  }

  export type TaskCreateOrConnectWithoutMessagesInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutMessagesInput, TaskUncheckedCreateWithoutMessagesInput>
  }

  export type UserCreateWithoutTaskMessagesInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    balance?: number
    rating?: number
    completedJobs?: number
    createdAt?: Date | string
    isAdmin?: boolean
    telegramChatId?: string | null
    telegramLinkCode?: string | null
    tasksAsClient?: TaskCreateNestedManyWithoutClientInput
    tasksAsWorker?: TaskCreateNestedManyWithoutWorkerInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTaskMessagesInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    balance?: number
    rating?: number
    completedJobs?: number
    createdAt?: Date | string
    isAdmin?: boolean
    telegramChatId?: string | null
    telegramLinkCode?: string | null
    tasksAsClient?: TaskUncheckedCreateNestedManyWithoutClientInput
    tasksAsWorker?: TaskUncheckedCreateNestedManyWithoutWorkerInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTaskMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTaskMessagesInput, UserUncheckedCreateWithoutTaskMessagesInput>
  }

  export type TaskUpsertWithoutMessagesInput = {
    update: XOR<TaskUpdateWithoutMessagesInput, TaskUncheckedUpdateWithoutMessagesInput>
    create: XOR<TaskCreateWithoutMessagesInput, TaskUncheckedCreateWithoutMessagesInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutMessagesInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutMessagesInput, TaskUncheckedUpdateWithoutMessagesInput>
  }

  export type TaskUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    budget?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientRating?: NullableIntFieldUpdateOperationsInput | number | null
    workerRating?: NullableIntFieldUpdateOperationsInput | number | null
    escrowHeld?: BoolFieldUpdateOperationsInput | boolean
    submissionNote?: NullableStringFieldUpdateOperationsInput | string | null
    submissionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    takenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disputeReason?: NullableStringFieldUpdateOperationsInput | string | null
    disputedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    client?: UserUpdateOneRequiredWithoutTasksAsClientNestedInput
    worker?: UserUpdateOneWithoutTasksAsWorkerNestedInput
  }

  export type TaskUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    workerId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    budget?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientRating?: NullableIntFieldUpdateOperationsInput | number | null
    workerRating?: NullableIntFieldUpdateOperationsInput | number | null
    escrowHeld?: BoolFieldUpdateOperationsInput | boolean
    submissionNote?: NullableStringFieldUpdateOperationsInput | string | null
    submissionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    takenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disputeReason?: NullableStringFieldUpdateOperationsInput | string | null
    disputedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUpsertWithoutTaskMessagesInput = {
    update: XOR<UserUpdateWithoutTaskMessagesInput, UserUncheckedUpdateWithoutTaskMessagesInput>
    create: XOR<UserCreateWithoutTaskMessagesInput, UserUncheckedCreateWithoutTaskMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTaskMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTaskMessagesInput, UserUncheckedUpdateWithoutTaskMessagesInput>
  }

  export type UserUpdateWithoutTaskMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    completedJobs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    telegramChatId?: NullableStringFieldUpdateOperationsInput | string | null
    telegramLinkCode?: NullableStringFieldUpdateOperationsInput | string | null
    tasksAsClient?: TaskUpdateManyWithoutClientNestedInput
    tasksAsWorker?: TaskUpdateManyWithoutWorkerNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTaskMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    completedJobs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    telegramChatId?: NullableStringFieldUpdateOperationsInput | string | null
    telegramLinkCode?: NullableStringFieldUpdateOperationsInput | string | null
    tasksAsClient?: TaskUncheckedUpdateManyWithoutClientNestedInput
    tasksAsWorker?: TaskUncheckedUpdateManyWithoutWorkerNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutTransactionsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    balance?: number
    rating?: number
    completedJobs?: number
    createdAt?: Date | string
    isAdmin?: boolean
    telegramChatId?: string | null
    telegramLinkCode?: string | null
    tasksAsClient?: TaskCreateNestedManyWithoutClientInput
    tasksAsWorker?: TaskCreateNestedManyWithoutWorkerInput
    taskMessages?: TaskMessageCreateNestedManyWithoutSenderInput
  }

  export type UserUncheckedCreateWithoutTransactionsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    balance?: number
    rating?: number
    completedJobs?: number
    createdAt?: Date | string
    isAdmin?: boolean
    telegramChatId?: string | null
    telegramLinkCode?: string | null
    tasksAsClient?: TaskUncheckedCreateNestedManyWithoutClientInput
    tasksAsWorker?: TaskUncheckedCreateNestedManyWithoutWorkerInput
    taskMessages?: TaskMessageUncheckedCreateNestedManyWithoutSenderInput
  }

  export type UserCreateOrConnectWithoutTransactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
  }

  export type UserUpsertWithoutTransactionsInput = {
    update: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    completedJobs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    telegramChatId?: NullableStringFieldUpdateOperationsInput | string | null
    telegramLinkCode?: NullableStringFieldUpdateOperationsInput | string | null
    tasksAsClient?: TaskUpdateManyWithoutClientNestedInput
    tasksAsWorker?: TaskUpdateManyWithoutWorkerNestedInput
    taskMessages?: TaskMessageUpdateManyWithoutSenderNestedInput
  }

  export type UserUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    completedJobs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    telegramChatId?: NullableStringFieldUpdateOperationsInput | string | null
    telegramLinkCode?: NullableStringFieldUpdateOperationsInput | string | null
    tasksAsClient?: TaskUncheckedUpdateManyWithoutClientNestedInput
    tasksAsWorker?: TaskUncheckedUpdateManyWithoutWorkerNestedInput
    taskMessages?: TaskMessageUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type TaskCreateManyClientInput = {
    id?: string
    workerId?: string | null
    title: string
    description: string
    category: string
    deadline: Date | string
    budget: number
    status?: string
    createdAt?: Date | string
    completedAt?: Date | string | null
    clientRating?: number | null
    workerRating?: number | null
    escrowHeld?: boolean
    submissionNote?: string | null
    submissionUrl?: string | null
    takenAt?: Date | string | null
    disputeReason?: string | null
    disputedAt?: Date | string | null
  }

  export type TaskCreateManyWorkerInput = {
    id?: string
    clientId: string
    title: string
    description: string
    category: string
    deadline: Date | string
    budget: number
    status?: string
    createdAt?: Date | string
    completedAt?: Date | string | null
    clientRating?: number | null
    workerRating?: number | null
    escrowHeld?: boolean
    submissionNote?: string | null
    submissionUrl?: string | null
    takenAt?: Date | string | null
    disputeReason?: string | null
    disputedAt?: Date | string | null
  }

  export type TransactionCreateManyUserInput = {
    id?: string
    type: string
    amount: number
    taskId?: string | null
    createdAt?: Date | string
    desc: string
    status?: string
    proofUrl?: string | null
    note?: string | null
    rejectionReason?: string | null
    bankDetails?: string | null
  }

  export type TaskMessageCreateManySenderInput = {
    id?: string
    taskId: string
    content: string
    createdAt?: Date | string
  }

  export type TaskUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    budget?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientRating?: NullableIntFieldUpdateOperationsInput | number | null
    workerRating?: NullableIntFieldUpdateOperationsInput | number | null
    escrowHeld?: BoolFieldUpdateOperationsInput | boolean
    submissionNote?: NullableStringFieldUpdateOperationsInput | string | null
    submissionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    takenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disputeReason?: NullableStringFieldUpdateOperationsInput | string | null
    disputedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    worker?: UserUpdateOneWithoutTasksAsWorkerNestedInput
    messages?: TaskMessageUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    workerId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    budget?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientRating?: NullableIntFieldUpdateOperationsInput | number | null
    workerRating?: NullableIntFieldUpdateOperationsInput | number | null
    escrowHeld?: BoolFieldUpdateOperationsInput | boolean
    submissionNote?: NullableStringFieldUpdateOperationsInput | string | null
    submissionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    takenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disputeReason?: NullableStringFieldUpdateOperationsInput | string | null
    disputedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    messages?: TaskMessageUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    workerId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    budget?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientRating?: NullableIntFieldUpdateOperationsInput | number | null
    workerRating?: NullableIntFieldUpdateOperationsInput | number | null
    escrowHeld?: BoolFieldUpdateOperationsInput | boolean
    submissionNote?: NullableStringFieldUpdateOperationsInput | string | null
    submissionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    takenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disputeReason?: NullableStringFieldUpdateOperationsInput | string | null
    disputedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TaskUpdateWithoutWorkerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    budget?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientRating?: NullableIntFieldUpdateOperationsInput | number | null
    workerRating?: NullableIntFieldUpdateOperationsInput | number | null
    escrowHeld?: BoolFieldUpdateOperationsInput | boolean
    submissionNote?: NullableStringFieldUpdateOperationsInput | string | null
    submissionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    takenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disputeReason?: NullableStringFieldUpdateOperationsInput | string | null
    disputedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    client?: UserUpdateOneRequiredWithoutTasksAsClientNestedInput
    messages?: TaskMessageUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutWorkerInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    budget?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientRating?: NullableIntFieldUpdateOperationsInput | number | null
    workerRating?: NullableIntFieldUpdateOperationsInput | number | null
    escrowHeld?: BoolFieldUpdateOperationsInput | boolean
    submissionNote?: NullableStringFieldUpdateOperationsInput | string | null
    submissionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    takenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disputeReason?: NullableStringFieldUpdateOperationsInput | string | null
    disputedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    messages?: TaskMessageUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutWorkerInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    budget?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientRating?: NullableIntFieldUpdateOperationsInput | number | null
    workerRating?: NullableIntFieldUpdateOperationsInput | number | null
    escrowHeld?: BoolFieldUpdateOperationsInput | boolean
    submissionNote?: NullableStringFieldUpdateOperationsInput | string | null
    submissionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    takenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disputeReason?: NullableStringFieldUpdateOperationsInput | string | null
    disputedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TransactionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    desc?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    bankDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransactionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    desc?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    bankDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransactionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    desc?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    bankDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskMessageUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type TaskMessageUncheckedUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskMessageUncheckedUpdateManyWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskMessageCreateManyTaskInput = {
    id?: string
    senderId: string
    content: string
    createdAt?: Date | string
  }

  export type TaskMessageUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutTaskMessagesNestedInput
  }

  export type TaskMessageUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskMessageUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}