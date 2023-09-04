/* Options:
Date: 2022-07-02 07:39:19
Version: 6.10
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: https://localhost:5001

//GlobalNamespace: 
//MakePropertiesOptional: False
//AddServiceStackTypes: True
//AddResponseStatus: False
//AddImplicitVersion: 
//AddDescriptionAsComments: True
//IncludeTypes: 
//ExcludeTypes: 
//DefaultImports: 
*/


export interface IReturn<T>
{
    createResponse(): T;
}

export interface IReturnVoid
{
    createResponse(): void;
}

export interface IHasSessionId
{
    sessionId: string;
}

export interface IHasBearerToken
{
    bearerToken: string;
}

export interface IPost
{
}

export class Frame
{
    public id: number;
    public name: string;
    public textBlock: number;

    public constructor(init?: Partial<Frame>) { (Object as any).assign(this, init); }
}

export class Project
{
    public id: number;
    public name: string;

    public constructor(init?: Partial<Project>) { (Object as any).assign(this, init); }
}

export class Scene extends Frame
{
    public frames: number[];
    public spriteSheetRefId: number;

    public constructor(init?: Partial<Scene>) { super(init); (Object as any).assign(this, init); }
}

export class SpriteSheet
{
    public id: number;
    public name: string;
    public spriteHeight: number;
    public spriteWidth: number;

    public constructor(init?: Partial<SpriteSheet>) { (Object as any).assign(this, init); }
}

export class Result
{
    public resultId: number;
    public projectId: number;
    public sceneId: number;
    public frameId: number;

    public constructor(init?: Partial<Result>) { (Object as any).assign(this, init); }
}

export class AddCharacterPieceGroupResult extends Result
{
    public name: string;
    public characterPieceSpriteSheetReferences: number[];

    public constructor(init?: Partial<AddCharacterPieceGroupResult>) { super(init); (Object as any).assign(this, init); }
}

export class UpdateCharacterPieceGroupResult extends Result
{
    public name: string;
    public characterPieceSpriteSheetReferences: number[];

    public constructor(init?: Partial<UpdateCharacterPieceGroupResult>) { super(init); (Object as any).assign(this, init); }
}

export class RemoveCharacterPieceGroupResult extends Result
{
    public name: string;
    public characterPieceSpriteSheetReferences: number[];

    public constructor(init?: Partial<RemoveCharacterPieceGroupResult>) { super(init); (Object as any).assign(this, init); }
}

export class CharacterPieceSpriteSheetReference
{
    public id: number;
    public characterId: number;
    public pieceName: string;
    public pieceSetName: string;

    public constructor(init?: Partial<CharacterPieceSpriteSheetReference>) { (Object as any).assign(this, init); }
}

export class Character
{
    public id: number;
    public name: string;

    public constructor(init?: Partial<Character>) { (Object as any).assign(this, init); }
}

export class SpriteSheetRef
{
    public id: number;
    public spriteSheetId: number;
    public startFrame: number;
    public endFrame: number;

    public constructor(init?: Partial<SpriteSheetRef>) { (Object as any).assign(this, init); }
}

export class SpriteSheetRefResult extends Result
{
    public spriteSheetRefId: number;

    public constructor(init?: Partial<SpriteSheetRefResult>) { super(init); (Object as any).assign(this, init); }
}

export class MovesToFrameResult extends Result
{
    public movesToSceneId: number;
    public transitionType: string;
    public movesToFrameId: number;

    public constructor(init?: Partial<MovesToFrameResult>) { super(init); (Object as any).assign(this, init); }
}

export class MasksImageResult extends Result
{
    public imageId: number;

    public constructor(init?: Partial<MasksImageResult>) { super(init); (Object as any).assign(this, init); }
}

export class Condition
{
    public id: number;
    public projectId: number;
    public sceneId: number;
    public frameId: number;
    public showEffect: number;
    public beforeText: boolean;
    public resultId: number;
    public stopsEvaluationOnFalse: boolean;
    public stopsEvaluationOnTrue: boolean;
    public order: number;

    public constructor(init?: Partial<Condition>) { (Object as any).assign(this, init); }
}

export class MouseSwipeCondition extends Condition
{
    public spotId: number;
    public mouseSpeed: number;
    public mouseDirection: number;

    public constructor(init?: Partial<MouseSwipeCondition>) { super(init); (Object as any).assign(this, init); }
}

export class MouseHoverCondition extends Condition
{
    public spotId: number;
    public mouseDuration: number;

    public constructor(init?: Partial<MouseHoverCondition>) { super(init); (Object as any).assign(this, init); }
}

export class ClickCondition extends Condition
{
    public spotId: number;

    public constructor(init?: Partial<ClickCondition>) { super(init); (Object as any).assign(this, init); }
}

export class InventoryClickCondition extends ClickCondition
{
    public inventoryId: number;
    public inventoryCountBetweenLower: number;
    public inventoryCountBetweenUpper: number;
    public not: boolean;

    public constructor(init?: Partial<InventoryClickCondition>) { super(init); (Object as any).assign(this, init); }
}

export class Spot
{
    public id: number;
    public projectId: number;
    public height: number;
    public width: number;
    public visibleEffect: boolean;
    public inventoryClickCondition?: number;
    public x: number;
    public y: number;

    public constructor(init?: Partial<Spot>) { (Object as any).assign(this, init); }
}

export class SceneStartCondition extends Condition
{

    public constructor(init?: Partial<SceneStartCondition>) { super(init); (Object as any).assign(this, init); }
}

export class FrameStartCondition extends Condition
{

    public constructor(init?: Partial<FrameStartCondition>) { super(init); (Object as any).assign(this, init); }
}

export class Item
{
    public id: number;
    public projectId: number;
    public name: string;
    public unique: boolean;

    public constructor(init?: Partial<Item>) { (Object as any).assign(this, init); }
}

export class GameScene
{
    public frames: Frame[];
    public project: Project;
    public scene: Scene;
    public spriteSheets: SpriteSheet[];
    public addCharacterPieceGroupResults: AddCharacterPieceGroupResult[];
    public updateCharacterPieceGroupResults: UpdateCharacterPieceGroupResult[];
    public removeCharacterPieceGroupResults: RemoveCharacterPieceGroupResult[];
    public characterPieceSpriteSheetReferences: CharacterPieceSpriteSheetReference[];
    public characters: Character[];
    public spriteSheetRefs: SpriteSheetRef[];
    public spriteSheetRefResults: SpriteSheetRefResult[];
    public movesToFrameResult: MovesToFrameResult[];
    public masksImageResult: MasksImageResult[];
    public mouseSwipeCondition: MouseSwipeCondition[];
    public mouseHoverCondition: MouseHoverCondition[];
    public clickConditions: ClickCondition[];
    public inventoryClickCondition: InventoryClickCondition[];
    public spot: Spot[];
    public sceneStartCondition: SceneStartCondition[];
    public frameStartConditions: FrameStartCondition[];
    public gameItems: Item[];

    public constructor(init?: Partial<GameScene>) { (Object as any).assign(this, init); }
}

export class Inventory
{
    public id: number;
    public userId: number;
    public gameId: number;
    public itemId: number;
    public itemCount: number;

    public constructor(init?: Partial<Inventory>) { (Object as any).assign(this, init); }
}

export class PlayerSave
{
    public items: Inventory[];

    public constructor(init?: Partial<PlayerSave>) { (Object as any).assign(this, init); }
}

// @DataContract
export class ResponseError
{
    // @DataMember(Order=1)
    public errorCode: string;

    // @DataMember(Order=2)
    public fieldName: string;

    // @DataMember(Order=3)
    public message: string;

    // @DataMember(Order=4)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<ResponseError>) { (Object as any).assign(this, init); }
}

// @DataContract
export class ResponseStatus
{
    // @DataMember(Order=1)
    public errorCode: string;

    // @DataMember(Order=2)
    public message: string;

    // @DataMember(Order=3)
    public stackTrace: string;

    // @DataMember(Order=4)
    public errors: ResponseError[];

    // @DataMember(Order=5)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<ResponseStatus>) { (Object as any).assign(this, init); }
}

export class GameSceneResponse
{
    public gameScene: GameScene;

    public constructor(init?: Partial<GameSceneResponse>) { (Object as any).assign(this, init); }
}

export class PlayerSaveResponse
{
    public playerSave: PlayerSave;

    public constructor(init?: Partial<PlayerSaveResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class AuthenticateResponse implements IHasSessionId, IHasBearerToken
{
    // @DataMember(Order=1)
    public userId: string;

    // @DataMember(Order=2)
    public sessionId: string;

    // @DataMember(Order=3)
    public userName: string;

    // @DataMember(Order=4)
    public displayName: string;

    // @DataMember(Order=5)
    public referrerUrl: string;

    // @DataMember(Order=6)
    public bearerToken: string;

    // @DataMember(Order=7)
    public refreshToken: string;

    // @DataMember(Order=8)
    public profileUrl: string;

    // @DataMember(Order=9)
    public roles: string[];

    // @DataMember(Order=10)
    public permissions: string[];

    // @DataMember(Order=11)
    public responseStatus: ResponseStatus;

    // @DataMember(Order=12)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<AuthenticateResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class AssignRolesResponse
{
    // @DataMember(Order=1)
    public allRoles: string[];

    // @DataMember(Order=2)
    public allPermissions: string[];

    // @DataMember(Order=3)
    public meta: { [index: string]: string; };

    // @DataMember(Order=4)
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<AssignRolesResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class UnAssignRolesResponse
{
    // @DataMember(Order=1)
    public allRoles: string[];

    // @DataMember(Order=2)
    public allPermissions: string[];

    // @DataMember(Order=3)
    public meta: { [index: string]: string; };

    // @DataMember(Order=4)
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<UnAssignRolesResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class RegisterResponse implements IHasSessionId, IHasBearerToken
{
    // @DataMember(Order=1)
    public userId: string;

    // @DataMember(Order=2)
    public sessionId: string;

    // @DataMember(Order=3)
    public userName: string;

    // @DataMember(Order=4)
    public referrerUrl: string;

    // @DataMember(Order=5)
    public bearerToken: string;

    // @DataMember(Order=6)
    public refreshToken: string;

    // @DataMember(Order=7)
    public roles: string[];

    // @DataMember(Order=8)
    public permissions: string[];

    // @DataMember(Order=9)
    public responseStatus: ResponseStatus;

    // @DataMember(Order=10)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<RegisterResponse>) { (Object as any).assign(this, init); }
}

// @Route("/PlayerSave")
export class GameSceneRequest implements IReturn<GameSceneResponse>
{

    public constructor(init?: Partial<GameSceneRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GameSceneRequest'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new GameSceneResponse(); }
}

// @Route("/PlayerSave")
export class PlayerSaveRequest implements IReturn<PlayerSaveResponse>
{

    public constructor(init?: Partial<PlayerSaveRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'PlayerSaveRequest'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new PlayerSaveResponse(); }
}

/**
* Sign In
*/
// @Route("/auth", "OPTIONS,GET,POST,DELETE")
// @Route("/auth/{provider}", "OPTIONS,GET,POST,DELETE")
// @Api(Description="Sign In")
// @DataContract
export class Authenticate implements IReturn<AuthenticateResponse>, IPost
{
    /**
    * AuthProvider, e.g. credentials
    */
    // @DataMember(Order=1)
    public provider: string;

    // @DataMember(Order=2)
    public state: string;

    // @DataMember(Order=3)
    public oauth_token: string;

    // @DataMember(Order=4)
    public oauth_verifier: string;

    // @DataMember(Order=5)
    public userName: string;

    // @DataMember(Order=6)
    public password: string;

    // @DataMember(Order=7)
    public rememberMe?: boolean;

    // @DataMember(Order=9)
    public errorView: string;

    // @DataMember(Order=10)
    public nonce: string;

    // @DataMember(Order=11)
    public uri: string;

    // @DataMember(Order=12)
    public response: string;

    // @DataMember(Order=13)
    public qop: string;

    // @DataMember(Order=14)
    public nc: string;

    // @DataMember(Order=15)
    public cnonce: string;

    // @DataMember(Order=17)
    public accessToken: string;

    // @DataMember(Order=18)
    public accessTokenSecret: string;

    // @DataMember(Order=19)
    public scope: string;

    // @DataMember(Order=20)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<Authenticate>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'Authenticate'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new AuthenticateResponse(); }
}

// @Route("/assignroles", "POST")
// @DataContract
export class AssignRoles implements IReturn<AssignRolesResponse>, IPost
{
    // @DataMember(Order=1)
    public userName: string;

    // @DataMember(Order=2)
    public permissions: string[];

    // @DataMember(Order=3)
    public roles: string[];

    // @DataMember(Order=4)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<AssignRoles>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'AssignRoles'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new AssignRolesResponse(); }
}

// @Route("/unassignroles", "POST")
// @DataContract
export class UnAssignRoles implements IReturn<UnAssignRolesResponse>, IPost
{
    // @DataMember(Order=1)
    public userName: string;

    // @DataMember(Order=2)
    public permissions: string[];

    // @DataMember(Order=3)
    public roles: string[];

    // @DataMember(Order=4)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<UnAssignRoles>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UnAssignRoles'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new UnAssignRolesResponse(); }
}

/**
* Sign Up
*/
// @Route("/register", "PUT,POST")
// @Api(Description="Sign Up")
// @DataContract
export class Register implements IReturn<RegisterResponse>, IPost
{
    // @DataMember(Order=1)
    public userName: string;

    // @DataMember(Order=2)
    public firstName: string;

    // @DataMember(Order=3)
    public lastName: string;

    // @DataMember(Order=4)
    public displayName: string;

    // @DataMember(Order=5)
    public email: string;

    // @DataMember(Order=6)
    public password: string;

    // @DataMember(Order=7)
    public confirmPassword: string;

    // @DataMember(Order=8)
    public autoLogin?: boolean;

    // @DataMember(Order=10)
    public errorView: string;

    // @DataMember(Order=11)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<Register>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'Register'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new RegisterResponse(); }
}

