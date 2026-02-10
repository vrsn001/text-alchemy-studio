// URL Constants - Shorteners, regexes, and tracking parameters

// RFC 3986 compliant URL regex - preserves query strings and fragments
export const URL_REGEX = /(?:https?:\/\/|www\.)[^\s<>"{}|\\^`\[\]]+/gi;

// More specific regex for validation
export const VALID_URL_REGEX = /^(https?:\/\/)[^\s<>"{}|\\^`\[\]]+$/i;
export const WWW_URL_REGEX = /^www\.[^\s<>"{}|\\^`\[\]]+$/i;

// Common URL shorteners
export const SHORTENERS = [
  'bit.ly', 'tinyurl.com', 'goo.gl', 't.co', 'ow.ly', 'is.gd',
  'buff.ly', 'adf.ly', 'j.mp', 'rb.gy', 'cutt.ly', 'shorturl.at'
];

// UTM parameters to strip during normalization
export const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id'];

// Comprehensive tracking parameters - covers major platforms globally
// NOTE: Does NOT include generic params (q, page, sort, filter, etc.) to avoid breaking legitimate URLs
export const TRACKING_PARAMS = [
  // UTM Parameters (Universal)
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id',
  'utm_cid', 'utm_reader', 'utm_name', 'utm_referrer', 'utm_social', 'utm_social-type',
  'utm_brand', 'utm_viz_id', 'utm_pubreferrer', 'utm_swu', 'utm_hp_ref',
  // Google
  'gclid', 'gclsrc', 'dclid', 'gbraid', 'wbraid', 'gad_source', 'gad',
  'ved', 'usg', 'sa', 'ei', 'sei', 'bih', 'biw', 'dpr', 'prmd', 'rlz', 'sxsrf',
  'source', 'sourceid', 'sca_esv', 'sca_upv', 'fbs_aeid', 'tfeh', 'tfs', 'ictx',
  'gs_lp', 'gs_lcp', 'sclient', 'stick', 'oq', 'aqs', 'gs_l', 'pf', 'pq',
  '_ga', '_gl', '_gac', 'ga_source', 'ga_medium', 'ga_term', 'ga_content', 'ga_campaign',
  'shem', 'authuser', 'sz', 'cshid', 'nfpr', 'spell', 'qsubts', 'lsig',
  // Facebook / Meta
  'fbclid', 'fb_action_ids', 'fb_action_types', 'fb_source', 'fb_ref', 'fb_beacon_info',
  'mibextid', 'fbadid', 'fbc', 'fbp', 'fb_comment_id', 'fb_dtsg_ag', 'hrc',
  '__tn__', '__cft__', '__eep__', 'acontext', 'paipv', 'eav', 'extid',
  // Instagram
  'igsh', 'igshid', 'img_index', 'igs', 'ig_rid',
  // Twitter / X
  'ref_src', 'ref_url', 'twclid', 'original_referer',
  // TikTok
  'is_copy_url', 'is_from_webapp', 'sender_device', 'sender_web_id',
  '_r', '_d', 'u_code', 'preview_pb', 'enter_from', 'enter_method',
  'share_app_id', 'share_author_id', 'share_item_id', 'sharer_language',
  // YouTube
  'si', 'feature', 'pp', 'ab_channel', 'cbrd', 'ucbcb', 'frags', 'lc',
  // LinkedIn
  'lipi', 'lici', 'trk', 'trkInfo', 'trackingId', 'refId', 'midToken', 'midSig',
  'li_fat_id', 'li_tc', 'originalSubdomain',
  // Pinterest
  'pin_share',
  // Reddit
  'share_id', 'rdt_cid', '$deep_link', 'correlation_id',
  // Snapchat
  'sc_referrer', 'sc_ua', 'sc_ad_id', 'sc_campaign_id',
  // Microsoft / Bing
  'msclkid', 'cvid', 'form', 'pc', 'ocid',
  // Amazon
  'tag', 'linkCode', 'linkId', 'ref_', 'pf_rd_r', 'pf_rd_p', 'pf_rd_s', 'pf_rd_t',
  'pf_rd_i', 'pf_rd_m', 'psc', 'smid', 'dib', 'dib_tag', 'pd_rd_w', 'pd_rd_wg',
  'pd_rd_r', 'content-id', 'qid', 'sprefix', 'crid',
  // Spotify
  'go', 'sp_cid', 'nd', 'dl_branch',
  // Apple
  'mt', 'pt', 'ct', 'at', 'uo', 'itscg', 'itsct',
  // Mailchimp
  'mc_cid', 'mc_eid', 'mc_tc', 'mc_signupsource',
  // HubSpot
  'hsCtaTracking', 'hsa_cam', 'hsa_grp', 'hsa_mt', 'hsa_src', 'hsa_ad', 'hsa_acc',
  'hsa_net', 'hsa_kw', 'hsa_tgt', 'hsa_ver', '__hstc', '__hssc', '__hsfp', 'hsmi',
  // Marketo
  'mkt_tok',
  // Salesforce
  'sfmc_id', 'sfmc_activityid', 'sfc',
  // Adobe Analytics
  'ICID', 'icid', 's_kwcid', 'cid', 'ef_id', 's_cid', 'cmpid',
  // Affiliate Networks
  'ranMID', 'ranEAID', 'ranSiteID', 'siteID', 'lkid', 'afftrack',
  'cjsku', 'cjevent', 'cjdata', 'sscid',
  // Yandex
  'yclid', 'ymclid', 'ysclid',
  // Baidu
  'bd_vid', 'bd_source',
  // Yahoo
  'guccounter', 'guce_referrer', 'guce_referrer_sig',
  // Outbrain / Taboola
  'obOrigUrl', 'obApiRedirect', 'ob_click_id', 'dicbo', 'tblci',
  // Criteo
  'criteoId',
  // Shopify
  'syclid', 'ssclid', 'stid', 'preview_theme_id', 'srsltid',
  // Wix
  'referralInfo', 'metaSiteId', 'siteRevision', 'compId',
  // Squarespace
  'ssPageName', 'ss_source', 'ss_campaign_name', 'ss_campaign_id',
  // WordPress
  'replytocom', 'wcfmmp_guest_id',
  // Analytics SDKs
  'mp_source', 'mp_medium', 'mp_content',
  'amp_device_id', 'amp_js', 'ampDeviceId',
  'ajs_aid', 'ajs_uid', 'ajs_event',
  'wzrk_cid', 'wzrk_source', 'wzrk_medium',
  '_branch_match_id', '_branch_referrer',
  'adjust_tracker', 'adjust_adgroup', 'adjust_creative', 'adjust_campaign',
  'af_c_id', 'af_c', 'af_siteid', 'af_sub1', 'af_sub2', 'af_sub3', 'af_sub4', 'af_sub5',
  'af_channel', 'af_ad', 'af_adset', 'af_adset_id', 'af_ad_id',
  'ko_click_id',
  // General tracking
  'zanpid', 'spm', 'share_token',
  'campaign_id', 'campaignid', 'adid', 'ad_id', 'adset_id',
  'creative_id', 'placement_id', 'clickid', 'click_id',
  'tracking', 'tracker', 'trackid', 'tracking_id',
  'source_id', 'medium_id', 'affiliate', 'affiliate_id', 'partner_id',
  'impression_id', 'conversion_id',
  'cachebuster', 'nocache',
];

// Convert to Set for O(1) lookups
export const TRACKING_PARAMS_SET = new Set(TRACKING_PARAMS);
