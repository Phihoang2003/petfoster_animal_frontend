import { uploadImagesMessage } from "@/apis/images";
import { db } from "@/configs/firebase";
import {
  IAdoption,
  IAdoptPetNotification,
  IDetailOrder,
  IMessage,
  INotification,
  IPet,
  IPostDetail,
  IProductDetailOrders,
  IProfile,
  IPublistNotification,
} from "@/configs/interface";
import { ImageType } from "@/configs/types";
import { links } from "@/data/links";
import { contants } from "@/utils/constant";
import { generateKeywords } from "@/utils/firebaseUtils";
import { paseDataNotification, stringToUrl } from "@/utils/format";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  where,
  and,
  or,
  orderBy,
  limit,
  startAfter,
  QueryNonFilterConstraint,
  setDoc,
} from "firebase/firestore";
const getAllNotifications = async () => {
  try {
    // Tham chiếu đến collection 'config-constant-notifications'
    const notificationCollectionRef = collection(
      db,
      "config-constant-notifications"
    );

    // Lấy tất cả các tài liệu từ collection
    const querySnapshot = await getDocs(notificationCollectionRef);

    // Duyệt qua từng tài liệu và in ra thông tin
    querySnapshot.forEach((doc) => {
      console.log(`Document ID: ${doc.id}, Data:`, doc.data());
    });
  } catch (error) {
    console.error("Error retrieving documents: ", error);
  }
};
const getNotificationDetails = async (docId: string) => {
  try {
    // Lấy document từ Firestore
    const docRef = doc(db, "config-constant-notifications", docId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      // Lấy dữ liệu từ document
      const data = docSnapshot.data();
      console.log("Document data:", data);

      // Lấy các object trong meta.keys
      if (data.meta && data.meta.keys) {
        data.meta.keys.forEach((keyObject: any, index: number) => {
          console.log(`Key ${index + 1}:`, keyObject);
        });
      }
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
};

const copyDocumentWithNewID = async () => {
  // Bước 1: Truy xuất document gốc từ Firestore
  const docRef = doc(
    db,
    "config-constant-notifications",
    "rLag4ISzR5UMNvxiP3Y4"
  ); // 'documentIdToCopy' là ID của document gốc
  const docSnapshot = await getDoc(docRef);

  // Kiểm tra xem document có tồn tại không
  if (docSnapshot.exists()) {
    const data = docSnapshot.data(); // Lấy dữ liệu của document gốc

    // Bước 2: Tạo document mới với ID tự động
    const newDocRef = await addDoc(
      collection(db, "config-constant-notifications"),
      data
    );

    console.log("Document copied with new ID:", newDocRef.id); // In ra ID của document mới
  } else {
    console.log("No such document!");
  }
};
const getConstantNotification = async (notificationId: string) => {
  try {
    const notificationRef = doc(
      db,
      "config-constant-notifications",
      notificationId
    );
    const notificationRefShapshot = await getDoc(notificationRef);

    return notificationRefShapshot;
  } catch (error) {
    console.log("getNotification: Error setting getNotification info in DB");
  }
};
const publistPostsNotification = async (
  posts: IPostDetail,
  user: IProfile,
  currentUser: IProfile,
  type: "comment" | "like" | "like-comment"
) => {
  let id = null;

  switch (type) {
    case "like": {
      id = "ykBqnCLFRI8WyhfiQaTy";
      break;
    }
    case "comment": {
      id = "xZbOsgG4THMiX7PWlMot";
      break;
    }
    case "like-comment": {
      id = "oSVqe2HDdkxnrFjT0oEC";
      break;
    }
    default:
      id = null;
  }

  if (!id) return;

  try {
    const notificationRefShapshot = await getConstantNotification(id);

    if (!notificationRefShapshot) return null;

    const constNotification = {
      id: notificationRefShapshot.id,
      ...notificationRefShapshot.data(),
    } as INotification;

    return await addDoc(collection(db, "notifications"), {
      content: paseDataNotification<IPostDetail & { displayName: string }>(
        constNotification,
        { ...posts, user, displayName: currentUser.displayName },
        false
      ),
      createdAt: serverTimestamp(),
      deleted: false,
      link: links.adorables.index + `?uuid=${posts.id}&open=auto`,
      linkAdmin: links.adorables.index + `?uuid=${posts.id}&open=auto`,
      photourl: posts.user.avatar,
      read: [],
      target: [user.username],
      title: constNotification.title,
      type: constNotification.type,
      options: constNotification.options,
      public: false,
      adminCotent: paseDataNotification<IPostDetail & { displayName: string }>(
        constNotification,
        { ...posts, user, displayName: currentUser.displayName },
        true
      ),
    });
  } catch (error) {
    console.log(
      "publistAdoptPetNotification: Error setting publistAdoptPetNotification info in DB"
    );
  }
};
const getNotifications = (
  user: IProfile | null,
  options: {
    limit: number;
    start?: QueryDocumentSnapshot<DocumentData, DocumentData>;
  } = { limit: Number(process.env.NEXT_PUBLIC_LIMIT_NOTIFI) }
) => {
  if (!user) return null;

  const constraintsAdmin: any = [
    and(
      where("deleted", "==", false),
      or(
        where("target", "array-contains", "all"),
        where("target", "array-contains", user.username),
        where("target", "array-contains", contants.usernameAdmin),
        where("public", "==", false)
      )
    ),
    orderBy("createdAt", "desc"),
    limit(options.limit),
  ];

  const constraintsUser: any = [
    and(
      where("deleted", "==", false),
      or(
        where("target", "array-contains", "all"),
        where("target", "array-contains", user.username)
      )
    ),
    orderBy("createdAt", "desc"),
    limit(options.limit),
  ];

  if (options.start) {
    if (contants.roles.manageRoles.includes(user.role)) {
      constraintsAdmin.push(startAfter(options.start));
    } else {
      constraintsUser.push(startAfter(options.start));
    }
  }

  if (contants.roles.manageRoles.includes(user.role)) {
    return query(
      collection(db, "notifications"),
      ...(constraintsAdmin as QueryNonFilterConstraint[])
    );
  } else {
    return query(
      collection(db, "notifications"),
      ...(constraintsUser as QueryNonFilterConstraint[])
    );
  }
};
const setRead = async (
  notificationid: string,
  readArr: string[],
  newRead: string
) => {
  try {
    await setDoc(
      doc(db, "notifications", notificationid),
      {
        read: [...readArr, newRead],
      },
      { merge: true } // just update what is change
    );
  } catch (error) {
    console.log("setRead: Error setting setRead info in DB");
  }
};
const handleMarkAllAsRead = async (
  dataNotifications: INotification[],
  user: IProfile | null
) => {
  if (!user) return;

  dataNotifications.forEach(async (item) => {
    if (!item.read.includes(user.username)) {
      await firebaseService.setRead(item.id, item.read, user.username);
    }
  });
};
const setLastseen = async (user: IProfile) => {
  try {
    await setDoc(
      doc(db, "users", user.username),
      {
        lastSeen: serverTimestamp(),
        online: false,
      },
      { merge: true } // just update what is change
    );
  } catch (error) {
    console.log("setLastseen: Error setting setLastseen info in DB");
  }
};

const addSuccessfulPurchaseNotification = async ({
  orderId,
  photourl,
  username,
  displayName,
}: {
  orderId?: number | string;
  photourl: string;
  username: string;
  displayName: string;
}) => {
  try {
    const notificationRef = doc(
      db,
      "config-constant-notifications",
      "zgNhCzDcpqSBeqs6UUnR"
    );
    const notificationRefShapshot = await getDoc(notificationRef);

    const constNotification = {
      id: notificationRefShapshot.id,
      ...notificationRefShapshot.data(),
    } as INotification;

    return await addDoc(collection(db, "notifications"), {
      content: paseDataNotification<{
        username: string;
        orderId?: number | string;
        displayName: string;
      }>(constNotification, { username, orderId, displayName }),
      createdAt: serverTimestamp(),
      deleted: false,
      link: orderId
        ? links.history.orderHistory + `/${orderId}`
        : links.history.orderHistory,
      linkAdmin: links.adminFuntionsLink.orders.index + `?orderId=${orderId}`,
      photourl: photourl,
      read: [],
      target: [username],
      title: constNotification.title,
      type: constNotification.type,
      options: constNotification.options,
      public: false,
      adminCotent: paseDataNotification<{
        username: string;
        orderId?: number | string;
        displayName: string;
      }>(constNotification, { username, orderId, displayName }, true),
    });
  } catch (error) {
    console.log(
      "addSuccessfulPurchaseNotification: Error setting addSuccessfulPurchaseNotification info in DB"
    );
  }
};

const publistStateCancelByCustomerOrderNotification = async (
  order: IDetailOrder & { orderId: string; reason: string }
) => {
  try {
    const notificationRef = doc(
      db,
      "config-constant-notifications",
      "nLb36XXO3x1MfBmHPUE8"
    );
    const notificationRefShapshot = await getDoc(notificationRef);

    const constNotification = {
      id: notificationRefShapshot.id,
      ...notificationRefShapshot.data(),
    } as INotification;

    return await addDoc(collection(db, "notifications"), {
      // content: constNotification.content.replaceAll('&&', pet.name),
      content: paseDataNotification<
        IDetailOrder & { orderId: string; reason: string }
      >(constNotification, { ...order }, false),
      createdAt: serverTimestamp(),
      deleted: false,
      link: links.history.orderHistory + `/${order.id}`,
      linkAdmin: links.adminFuntionsLink.orders.index + `?orderId=${order.id}`, // http://localhost:3000/admin/dashboard/orders?orderId=186
      photourl: order.products[0].image,
      read: [],
      target: [order.username],
      title: constNotification.title,
      type: constNotification.type,
      options: constNotification.options,
      public: false,
      adminCotent: paseDataNotification<
        IDetailOrder & { orderId: string; reason: string }
      >(constNotification, { ...order }, true),
    });
  } catch (error) {
    console.log(
      "publistStateOrder: Error setting publistStateOrder info in DB"
    );
  }
};

const publistRatingProductNotification = async (
  product: IProductDetailOrders,
  username: string
) => {
  try {
    const notificationRef = doc(
      db,
      "config-constant-notifications",
      "rLag4ISzR5UMNvxiP3Y4"
    );
    const notificationRefShapshot = await getDoc(notificationRef);

    const constNotification = {
      id: notificationRefShapshot.id,
      ...notificationRefShapshot.data(),
    } as INotification;

    return await addDoc(collection(db, "notifications"), {
      // content: constNotification.content.replaceAll('&&', pet.name),
      content: paseDataNotification<
        IProductDetailOrders & { username: string }
      >(constNotification, { ...product, username }, false),
      createdAt: serverTimestamp(),
      deleted: false,
      link:
        links.product + `/${product.productId}/${stringToUrl(product.name)}`,
      linkAdmin:
        links.adminFuntionsLink.reviews.index + `/${product.productId}`,
      photourl: product.image,
      read: [],
      target: [username],
      title: constNotification.title,
      type: constNotification.type,
      options: constNotification.options,
      public: false,
      adminCotent: paseDataNotification<
        IProductDetailOrders & { username: string }
      >(constNotification, { ...product, username }, true),
    });
  } catch (error) {
    console.log(
      "publistStateOrder: Error setting publistStateOrder info in DB"
    );
  }
};

const publistFavoriteNotification = async (pet: IPet, user: IProfile) => {
  try {
    const notificationRef = doc(
      db,
      "config-constant-notifications",
      "FNIw00ZoejGPgJUJfcTH"
    );
    const notificationRefShapshot = await getDoc(notificationRef);

    const constNotification = {
      id: notificationRefShapshot.id,
      ...notificationRefShapshot.data(),
    } as INotification;

    return await addDoc(collection(db, "notifications"), {
      content: paseDataNotification<
        IPublistNotification<IPet & { displayName: string }>
      >(
        constNotification,
        { ...pet, username: user.username, displayName: user.displayName },
        false
      ),
      createdAt: serverTimestamp(),
      deleted: false,
      link: links.pet + `${pet.id}/${stringToUrl(pet.name)}`,
      linkAdmin: links.adminFuntionsLink.pets.index + `/${pet.id}`,
      photourl: pet.image,
      read: [],
      target: [user.username],
      title: constNotification.title,
      type: constNotification.type,
      options: constNotification.options,
      public: false,
      adminCotent: paseDataNotification<IPublistNotification<IPet>>(
        constNotification,
        { ...pet, username: user.username, displayName: user.displayName },
        true
      ),
    });
  } catch (error) {
    console.log(
      "addSuccessfulPurchaseNotification: Error setting addSuccessfulPurchaseNotification info in DB"
    );
  }
};

const publistAdoptPetNotification = async (
  pet: IPet,
  username: string,
  phone: string,
  displayName: string
) => {
  try {
    const notificationRefShapshot = await getConstantNotification(
      "TcmP1Nii3D10czU7MZE4"
    );

    if (!notificationRefShapshot) return null;

    const constNotification = {
      id: notificationRefShapshot.id,
      ...notificationRefShapshot.data(),
    } as INotification;

    return await addDoc(collection(db, "notifications"), {
      // content: constNotification.content.replaceAll('&&', pet.name),
      content: paseDataNotification<IAdoptPetNotification>(
        constNotification,
        { ...pet, phone, username, displayName },
        false
      ),
      createdAt: serverTimestamp(),
      deleted: false,
      link: links.users.profiles.adoption,
      linkAdmin:
        links.adminFuntionsLink.adoption.index + `?q=${stringToUrl(pet.name)}`,
      photourl: pet.image,
      read: [],
      target: [username],
      title: constNotification.title,
      type: constNotification.type,
      options: constNotification.options,
      public: false,
      adminCotent: paseDataNotification<IAdoptPetNotification>(
        constNotification,
        { ...pet, phone, username, displayName },
        true
      ),
    });
  } catch (error) {
    console.log(
      "publistAdoptPetNotification: Error setting publistAdoptPetNotification info in DB"
    );
  }
};

const publistCancelAdoptPetNotification = async (
  adoption: IAdoption,
  reason: string,
  isAdmin = false
) => {
  const id = isAdmin ? "0KIFLeKQr3D86qRLRyBF" : "EfaHRBBbsqG5TLVzIJ4y";
  try {
    const notificationRefShapshot = await getConstantNotification(id);

    if (!notificationRefShapshot) return null;

    const constNotification = {
      id: notificationRefShapshot.id,
      ...notificationRefShapshot.data(),
    } as INotification;

    return await addDoc(collection(db, "notifications"), {
      // content: constNotification.content.replaceAll('&&', pet.name),
      content: paseDataNotification<
        IPublistNotification<IAdoption> & {
          shopAddress: string;
          name: string;
          reason: string;
        }
      >(
        constNotification,
        {
          ...adoption,
          shopAddress: process.env.NEXT_PUBLIC_DETAIL_ADDRESS || "",
          username: adoption.user.username,
          displayName: adoption.user.displayName,
          name: adoption.pet.name,
          reason,
        },
        false
      ),
      createdAt: serverTimestamp(),
      deleted: false,
      link: links.users.profiles.adoption,
      linkAdmin:
        links.adminFuntionsLink.adoption.index +
        `?q=${stringToUrl(adoption.pet.name)}`,
      photourl: adoption.pet.image,
      read: [],
      target: [adoption.user.username],
      title: constNotification.title,
      type: constNotification.type,
      options: constNotification.options,
      public: false,
      adminCotent: paseDataNotification<
        IPublistNotification<IAdoption> & {
          shopAddress: string;
          name: string;
          reason: string;
        }
      >(
        constNotification,
        {
          ...adoption,
          shopAddress: process.env.NEXT_PUBLIC_DETAIL_ADDRESS || "",
          username: adoption.user.username,
          displayName: adoption.user.displayName,
          name: adoption.pet.name,
          reason,
        },
        true
      ),
    });
  } catch (error) {
    console.log(
      "publistAdoptPetNotification: Error setting publistAdoptPetNotification info in DB"
    );
  }
};

const queryGetConversationForCurrentUser = (
  usernameUser: string | undefined
) => {
  return query(
    collection(db, "conversations"),
    where("users", "array-contains", usernameUser)
  );
};

const generateQueryGetMessages = (conversationId: string) => {
  return query(
    collection(db, "messages"),
    where("conversationId", "==", conversationId),
    orderBy("sendAt", "asc")
  );
};

const getUserByUsername = (username: string | null) => {
  if (!username) return;

  return query(collection(db, "users"), where("username", "==", username));
};

const setUserInBd = async (user: IProfile) => {
  try {
    await setDoc(
      doc(db, "users", user.username),
      {
        username: user.username,
        lassSeen: serverTimestamp(),
        avartar: user.avatar || contants.avartarDefault,
        online: true,
        keywords: generateKeywords(user.username),
        displayname: user.displayName || user.username,
      },
      { merge: true } // just update what is change
    );
  } catch (error) {
    console.log(error);
    console.log("LOGIN: Error setting user info in DB");
  }
};

const addConversation = async (usernameUser: string) => {
  const response = await addDoc(collection(db, "conversations"), {
    users: [contants.usernameAdmin, usernameUser],
    newMessage: null,
    sendAt: null,
    gim: false,
    seenMessage: false,
  });

  try {
    await setDoc(
      doc(db, "users", usernameUser),
      {
        conversationId: response.id,
      },
      { merge: true } // just update what is change
    );
  } catch (error) {
    console.log("LOGIN: Error setting user info in DB");
  }

  return response;
};

const handleImages = async (differentData: { images?: ImageType[] }) => {
  let images: string[] | null = null;
  let linksResponse: string[] = [];

  if (differentData?.images && differentData.images.length > 0) {
    const imagesRaw = differentData.images.filter((item) => {
      return item.data;
    });

    if (imagesRaw.length > 0) {
      // call api here

      try {
        const response = await uploadImagesMessage(imagesRaw);

        if (!response.errors && response.data.length > 0) {
          linksResponse = [...response.data];
        }
      } catch (error) {
        console.log("error in handleImages file firebase service: ", error);
      }
    }

    const imagesLink = differentData.images.filter((item) => {
      return !item.data;
    });

    if (linksResponse.length > 0) {
      images = [...linksResponse];
    }

    const imageLinkAfterMap = imagesLink.map((item) => {
      return item.link;
    });

    if (!images) {
      images = [...imageLinkAfterMap];
    } else {
      images = [...images, ...imageLinkAfterMap];
    }
  }

  return images;
};

const handleSendMessageToUser = async (
  value: string,
  conversationId: string,
  username: string,
  differentData?: { images?: ImageType[]; orderId?: string },
  type = "message"
) => {
  let images: string[] | null = null;

  if (differentData && differentData.images) {
    images = await handleImages(differentData);
  }

  return await addDoc(collection(db, "messages"), {
    conversationId: conversationId,
    currentUser: username,
    message: value,
    sendAt: serverTimestamp(),
    username: username,
    recall: false,
    seen: false,
    images: images,
    type: type,
  });
};

const setNewMessageConversation = async (
  conversationId: string,
  newMessageId: string
) => {
  try {
    await setDoc(
      doc(db, "conversations", conversationId),
      {
        newMessage: newMessageId,
        sendAt: serverTimestamp(),
        seenMessage: false,
      },
      { merge: true } // just update what is change
    );
  } catch (error) {
    console.log("setNewMessageConversation: Error setting user info in DB");
  }
};

const setRecallMessage = async (id: string) => {
  try {
    await setDoc(
      doc(db, "messages", id),
      {
        recall: true,
      },
      { merge: true } // just update what is change
    );
  } catch (error) {
    console.log("setNewMessageConversation: Error setting user info in DB");
  }
};

const handleSendMap = async (
  conversationId: string,
  username: string,
  data: { address: IMessage["address"]; location: IMessage["location"] },
  isAdmin = false
) => {
  const newMessage = await addDoc(collection(db, "messages"), {
    conversationId: conversationId,
    currentUser: username,
    message: null,
    sendAt: serverTimestamp(),
    username: isAdmin ? contants.usernameAdmin : username,
    recall: false,
    seen: false,
    images: null,
    orderId: null,
    type: "map",
    ...data,
  });

  const idNewMessage = newMessage.id;

  await firebaseService.setNewMessageConversation(conversationId, idNewMessage);

  return newMessage;
};

const handleSendOrder = async (
  conversationId: string,
  username: string,
  differentData?: { images?: ImageType[]; orderId?: string },
  type = "order"
) => {
  let images: string[] | null = null;

  if (differentData && differentData.images) {
    images = await handleImages(differentData);
  }

  return await addDoc(collection(db, "messages"), {
    conversationId: conversationId,
    currentUser: username,
    message: null,
    sendAt: serverTimestamp(),
    username: username,
    recall: false,
    seen: false,
    images: images,
    orderId: differentData?.orderId,
    type: type,
  });
};

const firebaseService = {
  setLastseen,
  publistPostsNotification,
  setRead,
  handleMarkAllAsRead,
  addSuccessfulPurchaseNotification,
  publistStateCancelByCustomerOrderNotification,
  publistRatingProductNotification,
  publistFavoriteNotification,
  publistAdoptPetNotification,
  publistCancelAdoptPetNotification,
  addConversation,
  handleSendMessageToUser,
  setNewMessageConversation,
  setRecallMessage,
  handleSendMap,
  handleSendOrder,
  setUserInBd,

  queries: {
    getAllNotifications,
    getNotificationDetails,
    copyDocumentWithNewID,
    getNotifications,
    queryGetConversationForCurrentUser,
    generateQueryGetMessages,
    getUserByUsername,
  },
};
export default firebaseService;
