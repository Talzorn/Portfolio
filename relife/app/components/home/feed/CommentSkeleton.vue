<template>
    <div class="comments-box">
        <div class="article-human">
            <div class="people-box__img" style="background-color: transparent;">
                <ion-skeleton-text animated style="line-height: 20px;--border-radius: 10px" />
            </div>
            <div class="article-human__group">
                <span class="article-human__name" style="align-self: unset">
                    <ion-skeleton-text animated style="line-height: 20px;width: 82%;max-width: 220px" />
                </span>
                <span class="article-human__date">
                    <ion-skeleton-text animated style="line-height: 14px;width: 90px;margin-top: 2px" />
                </span>
            </div>
        </div>
        <span>
            <ion-skeleton-text animated style="line-height: 22px;" />
        </span>
        <div class="comments-box__bottom" style="margin-bottom: 6px">
            <ion-skeleton-text animated style="line-height: 24px;margin-top: 6px;width: 90px" />
            <ion-skeleton-text animated style="line-height: 24px;margin-top: 6px;width: 80px;margin-left: auto" />
        </div>
    </div>
</template>

<script>
import { IonSkeletonText } from '@ionic/vue'

export default {
    name: 'CommentSkeleton',
    components: { IonSkeletonText }
}
</script>
