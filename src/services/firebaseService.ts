import { db } from "@/configs/firebase";
import {
  IDetailOrder,
  INotification,
  IPostDetail,
  IProductDetailOrders,
  IProfile,
} from "@/configs/interface";
import { links } from "@/data/links";
import { contants } from "@/utils/constant";
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

const firebaseService = {
  setLastseen,
  publistPostsNotification,
  setRead,
  handleMarkAllAsRead,
  addSuccessfulPurchaseNotification,
  publistStateCancelByCustomerOrderNotification,
  publistRatingProductNotification,

  queries: {
    getAllNotifications,
    getNotificationDetails,
    copyDocumentWithNewID,
    getNotifications,
  },
};
export default firebaseService;
